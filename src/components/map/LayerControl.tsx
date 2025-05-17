
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Layers } from "lucide-react";
import { MapLayer } from '@/hooks/useMapData';
import { Skeleton } from "@/components/ui/skeleton";

interface LayerControlProps {
  layers: MapLayer[];
  onLayerToggle: (id: string) => void;
  onOpacityChange: (id: string, value: number[]) => void;
  loading?: boolean;
}

const LayerControl: React.FC<LayerControlProps> = ({ 
  layers, 
  onLayerToggle, 
  onOpacityChange,
  loading = false
}) => {
  const baseLayers = layers.filter(layer => layer.type === 'base');
  const dataLayers = layers.filter(layer => layer.type !== 'base');
  
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">Layers</h3>
        </div>
        
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">Base Maps</h3>
      </div>
      
      <div className="space-y-3 mb-6">
        {baseLayers.map((layer) => (
          <div key={layer.id} className="flex items-center">
            <input
              type="radio"
              id={`layer-${layer.id}`}
              checked={layer.visible}
              onChange={() => onLayerToggle(layer.id)}
              className="mr-2 rounded"
              name="baseLayer"
            />
            <label htmlFor={`layer-${layer.id}`} className="text-sm">
              {layer.name}
            </label>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">Data Layers</h3>
        <Button variant="ghost" size="sm" className="h-7 px-2">
          <Layers size={14} className="mr-1" />
          Add
        </Button>
      </div>
      
      <div className="space-y-4">
        {dataLayers.length === 0 && (
          <p className="text-xs text-muted-foreground">No data layers available</p>
        )}
        
        {dataLayers.map((layer) => (
          <div key={layer.id} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`layer-${layer.id}`}
                  checked={layer.visible}
                  onChange={() => onLayerToggle(layer.id)}
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
            
            <div className="flex items-center gap-2">
              {layer.color && (
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: layer.color }}
                ></div>
              )}
              
              <Slider
                value={[layer.opacity]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={(value) => onOpacityChange(layer.id, value)}
                disabled={!layer.visible}
                className="h-1.5 flex-1"
              />
            </div>
            
            {layer.data && Array.isArray(layer.data) && (
              <p className="text-xs text-muted-foreground mt-1">
                {layer.data.length} {layer.type === 'point' ? 'points' : 'features'}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayerControl;
