
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Database, Layers, MapIcon, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";

interface MapLayer {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  opacity: number;
}

interface LayersTabProps {
  layers: MapLayer[];
  mapType: string;
  handleLayerToggle: (id: string) => void;
  handleOpacityChange: (id: string, value: number[]) => void;
  toggleFullScreen: () => void;
}

export const LayersTab: React.FC<LayersTabProps> = ({
  layers,
  mapType,
  handleLayerToggle,
  handleOpacityChange,
  toggleFullScreen
}) => {
  return (
    <>
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium flex items-center">
            <Layers className="h-4 w-4 mr-2" />
            Map Layers
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="space-y-4">
            {layers.map((layer) => (
              <div key={layer.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`layer-${layer.id}`}
                      checked={layer.id === mapType || (layer.id === 'africa-countries' && layer.visible)}
                      onChange={() => handleLayerToggle(layer.id)}
                      className="mr-2 rounded"
                    />
                    <label htmlFor={`layer-${layer.id}`} className="text-sm">
                      {layer.name}
                    </label>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(layer.opacity * 100)}%
                  </span>
                </div>
                <Slider
                  value={[layer.opacity]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={(value) => handleOpacityChange(layer.id, value)}
                  disabled={!(layer.id === mapType || (layer.id === 'africa-countries' && layer.visible))}
                  className="h-1.5"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium flex items-center">
            <Database className="h-4 w-4 mr-2" />
            Dataset Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2 space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center justify-center" 
            asChild
          >
            <Link to="/dataset-management">
              <Database className="h-4 w-4 mr-2" /> Manage Datasets
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium flex items-center">
            <MapIcon className="h-4 w-4 mr-2" />
            Map Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2 space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center justify-center" 
            onClick={toggleFullScreen}
          >
            <ZoomIn className="h-4 w-4 mr-2" /> Fullscreen
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
