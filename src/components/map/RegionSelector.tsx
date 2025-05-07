
import React from 'react';
import { Button } from "@/components/ui/button";

interface RegionSelectorProps {
  regionFocus: string;
  onRegionChange: (region: string) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ 
  regionFocus, 
  onRegionChange 
}) => {
  return (
    <div className="mb-4">
      <h4 className="text-xs font-medium mb-2 text-muted-foreground">Region Focus</h4>
      <div className="flex flex-wrap gap-1">
        <Button 
          size="sm" 
          variant={regionFocus === 'global' ? 'default' : 'outline'} 
          className="h-7 px-2 text-xs"
          onClick={() => onRegionChange('global')}
        >
          Global
        </Button>
        <Button 
          size="sm" 
          variant={regionFocus === 'africa' ? 'default' : 'outline'} 
          className="h-7 px-2 text-xs"
          onClick={() => onRegionChange('africa')}
        >
          Africa
        </Button>
        <Button 
          size="sm" 
          variant={regionFocus === 'zambia' ? 'default' : 'outline'} 
          className="h-7 px-2 text-xs"
          onClick={() => onRegionChange('zambia')}
        >
          Zambia
        </Button>
        <Button 
          size="sm" 
          variant={regionFocus === 'drc' ? 'default' : 'outline'} 
          className="h-7 px-2 text-xs"
          onClick={() => onRegionChange('drc')}
        >
          DRC
        </Button>
      </div>
    </div>
  );
};

export default RegionSelector;
