
import React, { useRef, useState, useEffect } from 'react';
import { Box } from 'lucide-react';
import LoadingState from './geo-visualization/LoadingState';
import VisualizationCanvas from './geo-visualization/VisualizationCanvas';
import ControlsTooltip from './geo-visualization/ControlsTooltip';

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
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [prevMousePos, setPrevMousePos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  
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
    e.preventDefault(); // Prevent page scrolling
    const newZoom = Math.max(0.5, Math.min(3, zoom - e.deltaY * 0.001));
    setZoom(newZoom);
  };
  
  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full"
    >
      {isLoading ? (
        <LoadingState dataset={dataset} />
      ) : (
        <>
          <VisualizationCanvas
            dataset={dataset}
            visualizationMode={visualizationMode}
            rotation={rotation}
            zoom={zoom}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onWheel={handleWheel}
          />
          <ControlsTooltip />
        </>
      )}
    </div>
  );
};

export default GeoStructure3DVisualization;
