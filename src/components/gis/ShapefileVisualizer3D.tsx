
import React, { useRef, useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface ShapefileVisualizer3DProps {
  data: any;
  height?: string | number;
}

const ShapefileVisualizer3D: React.FC<ShapefileVisualizer3DProps> = ({ 
  data,
  height = 400
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visualizationMode, setVisualizationMode] = useState<string>("elevation");
  const [isRendering, setIsRendering] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);
  
  // Effect to handle canvas rendering
  useEffect(() => {
    if (!canvasRef.current || !data?.features || data.features.length === 0) {
      return;
    }
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = typeof height === 'number' ? height : parseInt(height) || 400;
    }
    
    const render = () => {
      setIsRendering(true);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      try {
        // Draw background grid
        drawGrid(ctx, canvas.width, canvas.height);
        
        // Get all geometries from GeoJSON
        const features = data.features;
        
        // Calculate bounding box of all features
        const bounds = calculateBounds(features);
        if (!bounds) {
          console.log("Could not calculate bounds");
          return;
        }
        
        // Draw features based on visualization mode
        drawFeatures(ctx, features, bounds, canvas.width, canvas.height, visualizationMode);
        
        // Add legend
        drawLegend(ctx, canvas.width, canvas.height, visualizationMode);
        
        setHasRendered(true);
      } catch (error) {
        console.error("Error rendering 3D visualization:", error);
        
        // Draw error message
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(canvas.width / 2 - 150, canvas.height / 2 - 40, 300, 80);
        
        ctx.font = '14px Arial';
        ctx.fillStyle = '#e11d48';
        ctx.textAlign = 'center';
        ctx.fillText("Error rendering visualization", canvas.width / 2, canvas.height / 2 - 10);
        ctx.fillText("Check console for details", canvas.width / 2, canvas.height / 2 + 20);
      } finally {
        setIsRendering(false);
      }
    };
    
    // Initial render
    render();
    
    // Handle window resize
    const handleResize = () => {
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = typeof height === 'number' ? height : parseInt(height) || 400;
        render();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data, height, visualizationMode]);

  // Helper function to draw a grid
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
    ctx.lineWidth = 0.5;
    
    // Draw vertical lines
    for (let x = 0; x <= width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = 0; y <= height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };
  
  // Calculate bounds of all features
  const calculateBounds = (features: any[]) => {
    if (!features || features.length === 0) return null;
    
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    
    features.forEach(feature => {
      if (!feature.geometry) return;
      
      const extractCoords = (coords: number[] | number[][] | number[][][]) => {
        if (!Array.isArray(coords)) return;
        
        if (typeof coords[0] === 'number' && typeof coords[1] === 'number') {
          // Single coordinate pair [x, y]
          minX = Math.min(minX, coords[0]);
          maxX = Math.max(maxX, coords[0]);
          minY = Math.min(minY, coords[1]);
          maxY = Math.max(maxY, coords[1]);
        } else {
          // Array of coordinates or arrays
          coords.forEach(coord => extractCoords(coord as any));
        }
      };
      
      extractCoords(feature.geometry.coordinates);
    });
    
    if (minX === Infinity || minY === Infinity || maxX === -Infinity || maxY === -Infinity) {
      return null;
    }
    
    return { minX, minY, maxX, maxY };
  };
  
  // Draw features based on visualization mode
  const drawFeatures = (
    ctx: CanvasRenderingContext2D, 
    features: any[], 
    bounds: { minX: number, minY: number, maxX: number, maxY: number }, 
    width: number, 
    height: number,
    mode: string
  ) => {
    // Scale coordinates to fit canvas
    const scaleX = width * 0.9 / (bounds.maxX - bounds.minX);
    const scaleY = height * 0.7 / (bounds.maxY - bounds.minY);
    const offsetX = width * 0.05;
    const offsetY = height * 0.15;
    
    // Isometric projection factors
    const isoAngle = Math.PI / 6; // 30 degrees
    const cosA = Math.cos(isoAngle);
    const sinA = Math.sin(isoAngle);
    
    // Sort features by type for better layering
    const pointFeatures = features.filter(f => f.geometry?.type === 'Point');
    const lineFeatures = features.filter(f => f.geometry?.type === 'LineString' || f.geometry?.type === 'MultiLineString');
    const polygonFeatures = features.filter(f => f.geometry?.type === 'Polygon' || f.geometry?.type === 'MultiPolygon');
    
    // Draw polygon features first (background layer)
    polygonFeatures.forEach((feature, featureIndex) => {
      if (!feature.geometry) return;
      
      // Generate a color based on feature index and properties
      let fillColor;
      let elevation = 0;
      
      if (mode === 'elevation') {
        // Use elevation property if available
        elevation = feature.properties?.elevation || featureIndex % 5;
        const normalizedElevation = elevation / 10; // Normalize to 0-1 range
        fillColor = getElevationColor(normalizedElevation);
      } else if (mode === 'geology') {
        // Based on rock type or geology
        const rockType = feature.properties?.rockType || feature.properties?.geology || featureIndex % 5;
        fillColor = getGeologyColor(rockType);
      } else if (mode === 'minerals') {
        // Based on mineral content
        const mineral = feature.properties?.mineral || feature.properties?.mineralType || 'unknown';
        fillColor = getMineralColor(mineral);
      } else {
        // Default color scheme
        fillColor = `hsl(${(featureIndex * 30) % 360}, 70%, 60%)`;
      }
      
      // Draw polygon with 3D effect
      if (feature.geometry.type === 'Polygon') {
        drawPolygon3D(ctx, feature.geometry.coordinates[0], bounds, scaleX, scaleY, offsetX, offsetY, cosA, sinA, fillColor, elevation * 5);
      } else if (feature.geometry.type === 'MultiPolygon') {
        feature.geometry.coordinates.forEach((polygon: any) => {
          drawPolygon3D(ctx, polygon[0], bounds, scaleX, scaleY, offsetX, offsetY, cosA, sinA, fillColor, elevation * 5);
        });
      }
    });
    
    // Draw line features
    lineFeatures.forEach((feature, featureIndex) => {
      if (!feature.geometry) return;
      
      ctx.strokeStyle = `hsl(${((featureIndex * 30) + 120) % 360}, 70%, 50%)`;
      ctx.lineWidth = 1.5;
      
      if (feature.geometry.type === 'LineString') {
        drawLineString3D(ctx, feature.geometry.coordinates, bounds, scaleX, scaleY, offsetX, offsetY, cosA, sinA);
      } else if (feature.geometry.type === 'MultiLineString') {
        feature.geometry.coordinates.forEach((line: any) => {
          drawLineString3D(ctx, line, bounds, scaleX, scaleY, offsetX, offsetY, cosA, sinA);
        });
      }
    });
    
    // Draw point features (top layer)
    pointFeatures.forEach((feature, featureIndex) => {
      if (!feature.geometry) return;
      
      const pointColor = `hsl(${((featureIndex * 30) + 240) % 360}, 80%, 50%)`;
      drawPoint3D(ctx, feature.geometry.coordinates, bounds, scaleX, scaleY, offsetX, offsetY, cosA, sinA, pointColor);
    });
  };
  
  // Draw a polygon with 3D effect
  const drawPolygon3D = (
    ctx: CanvasRenderingContext2D,
    coords: number[][],
    bounds: { minX: number, minY: number, maxX: number, maxY: number },
    scaleX: number,
    scaleY: number,
    offsetX: number,
    offsetY: number,
    cosA: number,
    sinA: number,
    fillColor: string,
    height = 10
  ) => {
    if (!coords || coords.length < 3) return;
    
    // Get 2D coordinates (top face)
    const points2D = coords.map(coord => {
      const x = ((coord[0] - bounds.minX) * scaleX) + offsetX;
      const y = height * -1; // Height of the top face (negative moves up)
      const z = ((coord[1] - bounds.minY) * scaleY) + offsetY;
      
      // Apply isometric projection
      const screenX = x * cosA - z * cosA;
      const screenY = x * sinA + z * sinA + y;
      
      return { x: screenX, y: screenY };
    });
    
    // Draw top face
    ctx.beginPath();
    ctx.moveTo(points2D[0].x, points2D[0].y);
    for (let i = 1; i < points2D.length; i++) {
      ctx.lineTo(points2D[i].x, points2D[i].y);
    }
    ctx.closePath();
    
    // Fill with semi-transparent color
    ctx.fillStyle = fillColor;
    ctx.fill();
    
    // Draw outline
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  };
  
  // Draw a line with 3D effect
  const drawLineString3D = (
    ctx: CanvasRenderingContext2D,
    coords: number[][],
    bounds: { minX: number, minY: number, maxX: number, maxY: number },
    scaleX: number,
    scaleY: number,
    offsetX: number,
    offsetY: number,
    cosA: number,
    sinA: number
  ) => {
    if (!coords || coords.length < 2) return;
    
    // Get 2D coordinates
    ctx.beginPath();
    
    for (let i = 0; i < coords.length; i++) {
      const coord = coords[i];
      const x = ((coord[0] - bounds.minX) * scaleX) + offsetX;
      const y = 0; // Lines sit at ground level
      const z = ((coord[1] - bounds.minY) * scaleY) + offsetY;
      
      // Apply isometric projection
      const screenX = x * cosA - z * cosA;
      const screenY = x * sinA + z * sinA + y;
      
      if (i === 0) {
        ctx.moveTo(screenX, screenY);
      } else {
        ctx.lineTo(screenX, screenY);
      }
    }
    
    ctx.stroke();
  };
  
  // Draw a point with 3D effect
  const drawPoint3D = (
    ctx: CanvasRenderingContext2D,
    coords: number[],
    bounds: { minX: number, minY: number, maxX: number, maxY: number },
    scaleX: number,
    scaleY: number,
    offsetX: number,
    offsetY: number,
    cosA: number,
    sinA: number,
    color: string
  ) => {
    const x = ((coords[0] - bounds.minX) * scaleX) + offsetX;
    const y = -5; // Points float above ground
    const z = ((coords[1] - bounds.minY) * scaleY) + offsetY;
    
    // Apply isometric projection
    const screenX = x * cosA - z * cosA;
    const screenY = x * sinA + z * sinA + y;
    
    // Draw circle
    ctx.beginPath();
    ctx.arc(screenX, screenY, 5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    
    // Draw small shadow
    ctx.beginPath();
    ctx.ellipse(
      x * cosA - z * cosA,
      x * sinA + z * sinA + 5, // Shadow on ground level
      5, 2.5, 0, 0, Math.PI * 2
    );
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fill();
  };
  
  // Draw legend
  const drawLegend = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    mode: string
  ) => {
    const legendWidth = 150;
    const legendHeight = 100;
    const padding = 10;
    
    // Position in bottom right
    const legendX = width - legendWidth - padding;
    const legendY = height - legendHeight - padding;
    
    // Draw legend background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillRect(legendX, legendY, legendWidth, legendHeight);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.strokeRect(legendX, legendY, legendWidth, legendHeight);
    
    // Legend title
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'left';
    
    let title = 'Legend';
    if (mode === 'elevation') title = 'Elevation';
    else if (mode === 'geology') title = 'Geology';
    else if (mode === 'minerals') title = 'Minerals';
    
    ctx.fillText(title, legendX + 10, legendY + 20);
    
    // Draw legend items
    ctx.font = '10px Arial';
    
    if (mode === 'elevation') {
      const gradientHeight = 15;
      const gradientWidth = legendWidth - 20;
      const gradient = ctx.createLinearGradient(legendX + 10, 0, legendX + 10 + gradientWidth, 0);
      
      gradient.addColorStop(0, getElevationColor(0));
      gradient.addColorStop(0.25, getElevationColor(0.25));
      gradient.addColorStop(0.5, getElevationColor(0.5));
      gradient.addColorStop(0.75, getElevationColor(0.75));
      gradient.addColorStop(1, getElevationColor(1));
      
      ctx.fillStyle = gradient;
      ctx.fillRect(legendX + 10, legendY + 30, gradientWidth, gradientHeight);
      
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'left';
      ctx.fillText('Low', legendX + 10, legendY + 60);
      ctx.textAlign = 'right';
      ctx.fillText('High', legendX + legendWidth - 10, legendY + 60);
    } else if (mode === 'geology') {
      const rockTypes = ['Igneous', 'Sedimentary', 'Metamorphic', 'Volcanic'];
      
      rockTypes.forEach((rock, i) => {
        const y = legendY + 35 + i * 15;
        ctx.fillStyle = getGeologyColor(rock);
        ctx.fillRect(legendX + 10, y - 7, 10, 10);
        
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';
        ctx.fillText(rock, legendX + 25, y);
      });
    } else if (mode === 'minerals') {
      const minerals = ['Gold', 'Copper', 'Iron', 'Coal'];
      
      minerals.forEach((mineral, i) => {
        const y = legendY + 35 + i * 15;
        ctx.fillStyle = getMineralColor(mineral);
        ctx.fillRect(legendX + 10, y - 7, 10, 10);
        
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';
        ctx.fillText(mineral, legendX + 25, y);
      });
    }
  };
  
  // Color utilities
  const getElevationColor = (normalizedElevation: number) => {
    // Color gradient from blue (low) to green (mid) to brown/red (high)
    if (normalizedElevation < 0.3) {
      return `rgba(86, 180, 233, ${0.6 + normalizedElevation * 0.4})`;
    } else if (normalizedElevation < 0.6) {
      return `rgba(0, 158, 115, ${0.6 + normalizedElevation * 0.4})`;
    } else {
      return `rgba(213, 94, 0, ${0.6 + normalizedElevation * 0.4})`;
    }
  };
  
  const getGeologyColor = (rockType: string | number) => {
    if (typeof rockType === 'number') {
      const types = ['Igneous', 'Sedimentary', 'Metamorphic', 'Volcanic', 'Other'];
      rockType = types[rockType % types.length];
    }
    
    switch (String(rockType).toLowerCase()) {
      case 'igneous': return 'rgba(230, 85, 13, 0.8)';
      case 'sedimentary': return 'rgba(240, 228, 66, 0.8)';
      case 'metamorphic': return 'rgba(153, 112, 171, 0.8)';
      case 'volcanic': return 'rgba(204, 51, 17, 0.8)';
      default: return 'rgba(120, 120, 120, 0.8)';
    }
  };
  
  const getMineralColor = (mineral: string | number) => {
    if (typeof mineral === 'number') {
      const minerals = ['Gold', 'Copper', 'Iron', 'Coal', 'Other'];
      mineral = minerals[mineral % minerals.length];
    }
    
    switch (String(mineral).toLowerCase()) {
      case 'gold': return 'rgba(255, 215, 0, 0.8)';
      case 'copper': return 'rgba(184, 115, 51, 0.8)';
      case 'iron': return 'rgba(139, 69, 19, 0.8)';
      case 'coal': return 'rgba(46, 46, 46, 0.8)';
      default: return 'rgba(120, 120, 120, 0.8)';
    }
  };
  
  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">3D Geological Visualization</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center" style={{ height }}>
          <div className="text-center">
            <p className="text-muted-foreground">No data available for visualization</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">3D Geological Visualization</CardTitle>
          <Select 
            value={visualizationMode} 
            onValueChange={setVisualizationMode}
          >
            <SelectTrigger className="w-[180px] h-8">
              <SelectValue placeholder="Visualization Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="elevation">Elevation</SelectItem>
              <SelectItem value="geology">Geology</SelectItem>
              <SelectItem value="minerals">Minerals</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="relative">
        {isRendering && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <div className="relative" style={{ height }}>
          <canvas 
            ref={canvasRef} 
            className="w-full h-full"
          />
          {!hasRendered && !isRendering && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground">Loading visualization...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShapefileVisualizer3D;
