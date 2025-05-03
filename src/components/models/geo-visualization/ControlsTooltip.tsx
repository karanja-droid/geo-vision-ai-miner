
import React from 'react';
import { Box } from 'lucide-react';

const ControlsTooltip: React.FC = () => {
  return (
    <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 p-1 rounded">
      <div className="flex items-center">
        <Box className="h-3 w-3 mr-1" />
        Drag to rotate | Scroll to zoom
      </div>
    </div>
  );
};

export default ControlsTooltip;
