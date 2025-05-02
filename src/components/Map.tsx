
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";
import { Layers, Search, ZoomIn, ZoomOut, Upload, Database } from "lucide-react";
import { DataLayer } from '@/types';

// Mock layers for demo
const initialLayers: DataLayer[] = [
  { id: '1', name: 'Satellite Imagery', type: 'raster', visible: true, opacity: 1, data: null },
  { id: '2', name: 'Geological Map', type: 'vector', visible: true, opacity: 0.8, data: null },
  { id: '3', name: 'Soil Samples', type: 'point', visible: true, opacity: 1, data: null },
  { id: '4', name: 'Mineral Prediction', type: 'heatmap', visible: true, opacity: 0.7, data: null },
];

interface MapProps {
  className?: string;
}

const Map: React.FC<MapProps> = ({ className }) => {
  const [layers, setLayers] = useState<DataLayer[]>(initialLayers);
  const [zoom, setZoom] = useState<number>(50);

  const handleLayerToggle = (id: string) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const handleOpacityChange = (id: string, value: number[]) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, opacity: value[0] } : layer
    ));
  };

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0]);
  };

  return (
    <Card className={`h-full ${className}`}>
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
                  onValueChange={handleZoomChange}
                />
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ZoomIn size={14} />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex h-full">
          <div className="w-56 border-r p-3 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Layers</h3>
              <Button variant="ghost" size="sm" className="h-7 px-2">
                <Layers size={14} className="mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-3">
              {layers.map((layer) => (
                <div key={layer.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`layer-${layer.id}`}
                        checked={layer.visible}
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
                    disabled={!layer.visible}
                    className="h-1.5"
                  />
                </div>
              ))}
            </div>
            
            {/* Dataset Management Link */}
            <div className="mt-6 pt-4 border-t">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex justify-center items-center"
                asChild
              >
                <Link to="/dataset-management">
                  <Database size={14} className="mr-1" /> Manage Datasets
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-grow h-[500px] relative">
            <div className="absolute inset-0 grid-pattern">
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-4 rounded-lg bg-white/80 backdrop-blur-sm border">
                  <div className="w-12 h-12 rounded-full bg-geo-blue text-white flex items-center justify-center mx-auto mb-3">
                    <Database size={24} />
                  </div>
                  <h3 className="text-lg font-medium text-geo-blue mb-1">Map Preview</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Upload geological data to visualize on the map
                  </p>
                  <div className="space-x-2">
                    <Button size="sm" asChild>
                      <Link to="/dataset-management">
                        <Upload size={14} className="mr-1" /> Upload Data
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/interactive-map">
                        <Layers size={14} className="mr-1" /> Full Map
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Simulated Visualization Overlay (for demonstration) */}
              <div className="absolute bottom-8 left-8 w-32 h-32 gradient-anomaly animate-pulse-slow opacity-60"></div>
              <div className="absolute top-20 right-24 w-24 h-24 gradient-anomaly animate-pulse-slow opacity-50"></div>
              <div className="absolute bottom-36 right-40 w-40 h-40 gradient-anomaly animate-pulse-slow opacity-70"></div>
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col bg-white rounded-md shadow border">
              <Button variant="ghost" size="icon" className="rounded-none rounded-t-md border-b">
                <ZoomIn size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-none rounded-b-md">
                <ZoomOut size={18} />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Map;

// Export for convenience
export function Database(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}
