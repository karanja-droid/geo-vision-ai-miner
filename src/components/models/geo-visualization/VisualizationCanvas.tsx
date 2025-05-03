
import React, { useEffect, useRef } from 'react';
import { generateVisualizationData, applyRotationAndPerspective } from './utils';

interface VisualizationCanvasProps {
  dataset: string;
  visualizationMode: string;
  rotation: { x: number; y: number };
  zoom: number;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onWheel: (e: React.WheelEvent) => void;
}

const VisualizationCanvas: React.FC<VisualizationCanvasProps> = ({
  dataset,
  visualizationMode,
  rotation,
  zoom,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  onWheel
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Effect to initialize and update visualization
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw visualization based on dataset and mode
    drawVisualization(ctx, canvas.width, canvas.height);
    
  }, [dataset, visualizationMode, rotation, zoom]);

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
    
    // Get data based on dataset and visualization mode
    const { points, connections, colors } = generateVisualizationData(dataset, visualizationMode);
    
    // Apply 3D rotation to points based on user interaction
    const rotatedPoints = applyRotationAndPerspective(points, rotation, centerX, centerY, scale);
    
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

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-move"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onWheel={onWheel}
    />
  );
};

export default VisualizationCanvas;
