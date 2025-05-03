
import React from 'react';

const ControlsTooltip: React.FC = () => {
  return (
    <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-md shadow-md text-xs max-w-[220px]">
      <div className="font-medium mb-1">Controls:</div>
      <div className="grid grid-cols-[auto,1fr] gap-x-2">
        <span>Rotate:</span>
        <span>Click + drag</span>
        
        <span>Zoom:</span>
        <span>Scroll wheel</span>
      </div>
    </div>
  );
};

export default ControlsTooltip;
