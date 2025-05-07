
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Database as DatabaseIcon } from "lucide-react";
import { DataLayer } from '@/types';
import LayerControl from './LayerControl';
import RegionSelector from './RegionSelector';

interface MapSidebarProps {
  layers: DataLayer[];
  regionFocus: string;
  onLayerToggle: (id: string) => void;
  onOpacityChange: (id: string, value: number[]) => void;
  onRegionChange: (region: string) => void;
}

const MapSidebar: React.FC<MapSidebarProps> = ({
  layers,
  regionFocus,
  onLayerToggle,
  onOpacityChange,
  onRegionChange
}) => {
  return (
    <div className="w-56 border-r p-3 overflow-y-auto">
      <LayerControl 
        layers={layers}
        onLayerToggle={onLayerToggle}
        onOpacityChange={onOpacityChange}
      />
      
      <RegionSelector 
        regionFocus={regionFocus}
        onRegionChange={onRegionChange}
      />
      
      {/* Dataset Management Link */}
      <div className="mt-6 pt-4 border-t">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex justify-center items-center"
          asChild
        >
          <Link to="/dataset-management">
            <DatabaseIcon size={14} className="mr-1" /> Manage Datasets
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default MapSidebar;
