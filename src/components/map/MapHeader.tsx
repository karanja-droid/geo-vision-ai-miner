
import React from 'react';
import { Search, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface MapHeaderProps {
  zoom: number;
  onZoomChange: (value: number[]) => void;
}

const MapHeader: React.FC<MapHeaderProps> = ({ zoom, onZoomChange }) => {
  return (
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle>Exploration Map</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Search size={16} />
          </Button>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ZoomOut size={14} />
            </Button>
            <div className="w-24">
              <Slider 
                value={[zoom]} 
                min={0} 
                max={100} 
                step={1} 
                onValueChange={onZoomChange}
              />
            </div>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ZoomIn size={14} />
            </Button>
          </div>
        </div>
      </div>
    </CardHeader>
  );
};

export default MapHeader;
