
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Layers } from "lucide-react";
import { DataLayer } from '@/types';

interface LayerControlProps {
  layers: DataLayer[];
  onLayerToggle: (id: string) => void;
  onOpacityChange: (id: string, value: number[]) => void;
}

const LayerControl: React.FC<LayerControlProps> = ({ 
  layers, 
  onLayerToggle, 
  onOpacityChange 
}) => {
  return (
    <div>
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
            <Slider
              value={[layer.opacity]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(value) => onOpacityChange(layer.id, value)}
              disabled={!layer.visible}
              className="h-1.5"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayerControl;
