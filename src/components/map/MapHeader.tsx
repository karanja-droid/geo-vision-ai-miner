
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Layers } from "lucide-react";

interface MapHeaderProps {
  zoom: number;
  onZoomChange: (value: number[]) => void;
  loading?: boolean;
}

const MapHeader: React.FC<MapHeaderProps> = ({ zoom, onZoomChange, loading }) => {
  return (
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Layers className="mr-2 h-5 w-5" /> Geological Map
          </CardTitle>
          <CardDescription>
            {loading 
              ? "Loading map data..." 
              : "Explore geological features and datasets"}
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2 w-32">
          <span className="text-xs text-muted-foreground">Zoom</span>
          <Slider
            value={[zoom]}
            min={0}
            max={100}
            step={1}
            onValueChange={onZoomChange}
            className="h-4"
          />
        </div>
      </div>
    </CardHeader>
  );
};

export default MapHeader;
