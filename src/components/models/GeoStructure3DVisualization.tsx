
import React, { useEffect, useRef, useState } from 'react';
import { Cube, Loader2 } from 'lucide-react';

interface GeoStructure3DVisualizationProps {
  dataset: string;
  visualizationMode: string;
  isLoading?: boolean;
}

const GeoStructure3DVisualization: React.FC<GeoStructure3DVisualizationProps> = ({ 
  dataset, 
  visualizationMode,
  isLoading = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [prevMousePos, setPrevMousePos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  
  // Effect to initialize and update visualization
  useEffect(() => {
    if (isLoading || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw visualization based on dataset and mode
    drawVisualization(ctx, canvas.width, canvas.height);
    
  }, [dataset, visualizationMode, isLoading, rotation, zoom]);
  
  // Set up canvas dimensions on mount and resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      
      canvasRef.current.width = containerRef.current.clientWidth;
      canvasRef.current.height = containerRef.current.clientHeight;
      
      // Redraw after resize
      if (canvasRef.current && !isLoading) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          drawVisualization(ctx, canvasRef.current.width, canvasRef.current.height);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize size
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoading]);
  
  const drawVisualization = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number
  ) => {
    // Set up a basic 3D coordinate system with rotation
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = Math.min(width, height) * 0.3 * zoom;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Define the 3D points for a cube or other structures
    // based on dataset and visualization mode
    const points: [number, number, number][] = [];
    let connections: [number, number][] = [];
    let colors: string[] = [];
    
    // Create different visualizations based on the selected mode and dataset
    if (dataset === 'copper_deposit' || dataset === 'gold_vein') {
      // Create a 3D grid of points representing geological layers
      const gridSize = 5;
      const spacing = 1;
      
      // Generate grid points with some variation based on dataset
      for (let z = -gridSize; z <= gridSize; z += spacing) {
        for (let x = -gridSize; x <= gridSize; x += spacing) {
          let y = 0;
          
          // Create varied terrain
          if (dataset === 'copper_deposit') {
            // Create a terrain with potential copper deposit indicators
            y = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 2;
            
            // Add anomaly for copper deposit
            const dist = Math.sqrt(x * x + z * z);
            if (dist < 3) {
              y -= 1.5 * (3 - dist) / 3;
            }
          } else if (dataset === 'gold_vein') {
            // Create a terrain with vein-like structures
            y = Math.sin(x * 0.3 + z * 0.3) * 1.5;
            
            // Add vein
            if (Math.abs(x + z) < 1) {
              y -= 2;
            }
          }
          
          points.push([x, y, z]);
          
          // Determine point color based on visualization mode
          if (visualizationMode === 'mineralization') {
            const dist = Math.sqrt(x * x + z * z);
            if (dataset === 'copper_deposit' && dist < 3) {
              colors.push('#1E88E5'); // Blue for copper
            } else if (dataset === 'gold_vein' && Math.abs(x + z) < 1) {
              colors.push('#FFC107'); // Yellow for gold
            } else {
              colors.push('#9E9E9E'); // Gray for regular rock
            }
          } else if (visualizationMode === 'porosity') {
            const porosity = Math.abs(Math.sin(x * 0.7) * Math.cos(z * 0.7));
            const r = Math.floor(porosity * 255);
            const g = Math.floor((1 - porosity) * 255);
            colors.push(`rgb(${r}, ${g}, 150)`);
          } else if (visualizationMode === 'fault_lines') {
            if ((dataset === 'copper_deposit' && Math.abs(x) < 0.5) || 
                (dataset === 'gold_vein' && Math.abs(z) < 0.5)) {
              colors.push('#F44336'); // Red for fault lines
            } else {
              colors.push('#9E9E9E'); // Gray for regular rock
            }
          } else {
            // Default 3D structure coloring
            const depth = (y + 5) / 10; // Normalize to 0-1 range
            const r = Math.floor((1 - depth) * 200);
            const g = Math.floor(depth * 100 + 100);
            const b = Math.floor(depth * 255);
            colors.push(`rgb(${r}, ${g}, ${b})`);
          }
        }
      }
      
      // Create connections between adjacent points
      const pointsPerRow = 2 * gridSize / spacing + 1;
      for (let i = 0; i < points.length; i++) {
        // Connect to point to the right (if not at right edge)
        if ((i + 1) % pointsPerRow !== 0) {
          connections.push([i, i + 1]);
        }
        
        // Connect to point below (if exists)
        if (i + pointsPerRow < points.length) {
          connections.push([i, i + pointsPerRow]);
        }
      }
    } else if (dataset === 'fault_system') {
      // Create fault system visualization
      const gridSize = 5;
      const spacing = 1;
      
      // Generate grid points
      for (let z = -gridSize; z <= gridSize; z += spacing) {
        for (let x = -gridSize; x <= gridSize; x += spacing) {
          // Create fault system with offset
          let y;
          if (x > 0) {
            y = -1 + Math.sin(z * 0.5) * 0.5;
          } else {
            y = 1 + Math.sin(z * 0.5) * 0.5;
          }
          
          points.push([x, y, z]);
          
          // Color based on visualization mode
          if (visualizationMode === 'fault_lines') {
            if (Math.abs(x) < 0.5) {
              colors.push('#F44336'); // Red for fault lines
            } else {
              colors.push('#9E9E9E');
            }
          } else {
            const depth = (y + 5) / 10;
            const r = Math.floor((1 - depth) * 200);
            const g = Math.floor(depth * 100 + 100);
            const b = Math.floor(depth * 255);
            colors.push(`rgb(${r}, ${g}, ${b})`);
          }
        }
      }
      
      // Create connections for fault system
      const pointsPerRow = 2 * gridSize / spacing + 1;
      for (let i = 0; i < points.length; i++) {
        if ((i + 1) % pointsPerRow !== 0) {
          connections.push([i, i + 1]);
        }
        if (i + pointsPerRow < points.length) {
          connections.push([i, i + pointsPerRow]);
        }
      }
    } else if (dataset === 'sedimentary_basin') {
      // Create basin-like structure
      const levels = 8;
      const pointsPerCircle = 16;
      
      // Create concentric circles at different depths
      for (let level = 0; level < levels; level++) {
        const y = -level * 0.5;
        const radius = 5 - level * 0.4;
        
        for (let i = 0; i < pointsPerCircle; i++) {
          const angle = (i / pointsPerCircle) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          points.push([x, y, z]);
          
          // Determine color
          if (visualizationMode === 'porosity') {
            const porosity = (levels - level) / levels;
            const r = Math.floor(porosity * 255);
            const g = Math.floor((1 - porosity) * 200);
            const b = 100;
            colors.push(`rgb(${r}, ${g}, ${b})`);
          } else {
            // Layered coloring for sedimentary basin
            const colors = [
              '#FFF59D', // Sand
              '#A1887F', // Silt
              '#795548', // Clay
              '#5D4037', // Shale
              '#455A64', // Limestone
              '#37474F', // Dolomite
              '#263238', // Basement rock
              '#1A237E'  // Deep basement
            ];
            colors.push(colors[level]);
          }
        }
      }
      
      // Connect points in same level
      for (let level = 0; level < levels; level++) {
        const startIdx = level * pointsPerCircle;
        for (let i = 0; i < pointsPerCircle; i++) {
          connections.push([
            startIdx + i, 
            startIdx + ((i + 1) % pointsPerCircle)
          ]);
        }
      }
      
      // Connect levels
      for (let level = 0; level < levels - 1; level++) {
        for (let i = 0; i < pointsPerCircle; i++) {
          connections.push([
            level * pointsPerCircle + i,
            (level + 1) * pointsPerCircle + i
          ]);
        }
      }
    }
    
    // Apply 3D rotation to points based on user interaction
    const rotatedPoints = points.map(([x, y, z]) => {
      // Apply rotation around Y axis
      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);
      const x2 = x * cosY - z * sinY;
      const z2 = z * cosY + x * sinY;
      
      // Apply rotation around X axis
      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);
      const y2 = y * cosX - z2 * sinX;
      const z3 = z2 * cosX + y * sinX;
      
      // Calculate 2D position with perspective
      const perspective = 5;
      const depth = perspective / (perspective + z3);
      const screenX = centerX + x2 * scale * depth;
      const screenY = centerY + y2 * scale * depth;
      
      return { screenX, screenY, depth, originalZ: z3 };
    });
    
    // Sort connections by depth for proper rendering
    const sortedConnections = [...connections].sort((a, b) => {
      const depthA = (rotatedPoints[a[0]].originalZ + rotatedPoints[a[1]].originalZ) / 2;
      const depthB = (rotatedPoints[b[0]].originalZ + rotatedPoints[b[1]].originalZ) / 2;
      return depthB - depthA;
    });
    
    // Draw connections
    sortedConnections.forEach(([i, j]) => {
      const p1 = rotatedPoints[i];
      const p2 = rotatedPoints[j];
      
      // Fade lines based on depth
      const avgDepth = (p1.depth + p2.depth) / 2;
      const opacity = Math.min(1, Math.max(0.2, avgDepth * 0.8));
      
      ctx.beginPath();
      ctx.moveTo(p1.screenX, p1.screenY);
      ctx.lineTo(p2.screenX, p2.screenY);
      ctx.strokeStyle = `rgba(150,150,150,${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    
    // Sort points by depth (back-to-front) for proper rendering
    const sortedPointIndices = rotatedPoints
      .map((point, index) => ({ point, index }))
      .sort((a, b) => b.point.originalZ - a.point.originalZ)
      .map(item => item.index);
    
    // Draw points
    sortedPointIndices.forEach(i => {
      const { screenX, screenY, depth } = rotatedPoints[i];
      
      // Skip points outside canvas
      if (
        screenX < 0 || 
        screenX > width || 
        screenY < 0 || 
        screenY > height ||
        depth < 0
      ) {
        return;
      }
      
      // Size points based on depth
      const size = Math.max(2, 6 * depth);
      
      // Draw point
      ctx.beginPath();
      ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
      
      // Set color with depth-based opacity
      const color = colors[i] || '#666666';
      const opacity = Math.min(1, Math.max(0.2, depth));
      
      if (color.startsWith('#')) {
        // Handle hex colors
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
      } else {
        // Handle rgb colors
        ctx.fillStyle = color.replace('rgb', 'rgba').replace(')', `,${opacity})`);
      }
      
      ctx.fill();
    });
    
    // Draw model info
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillRect(10, height - 60, 180, 50);
    
    ctx.font = '12px Arial';
    ctx.fillStyle = '#333';
    ctx.fillText(`Dataset: ${dataset.replace('_', ' ')}`, 20, height - 40);
    ctx.fillText(`Mode: ${visualizationMode.replace('_', ' ')}`, 20, height - 20);
  };
  
  // Mouse handlers for rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setPrevMousePos({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const dx = e.clientX - prevMousePos.x;
    const dy = e.clientY - prevMousePos.y;
    
    setRotation({
      x: rotation.x + dy * 0.01,
      y: rotation.y + dx * 0.01,
    });
    
    setPrevMousePos({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  
  const handleWheel = (e: React.WheelEvent) => {
    const newZoom = Math.max(0.5, Math.min(3, zoom - e.deltaY * 0.001));
    setZoom(newZoom);
  };
  
  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full"
    >
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto mb-2" />
            <p className="text-muted-foreground">Loading {dataset.replace('_', ' ')} model...</p>
          </div>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onWheel={handleWheel}
        />
      )}
      
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 p-1 rounded">
        <div className="flex items-center">
          <Cube className="h-3 w-3 mr-1" />
          Drag to rotate | Scroll to zoom
        </div>
      </div>
    </div>
  );
};

export default GeoStructure3DVisualization;
