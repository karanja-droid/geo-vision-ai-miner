
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { initialLayers, africanLayers } from './map/data';
import MapHeader from './map/MapHeader';
import MapSidebar from './map/MapSidebar';
import MapVisualization from './map/MapVisualization';

interface MapProps {
  className?: string;
}

const Map: React.FC<MapProps> = ({ className }) => {
  const [layers, setLayers] = useState([...initialLayers, ...africanLayers]);
  const [zoom, setZoom] = useState<number>(50);
  const [regionFocus, setRegionFocus] = useState<string>('global');

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

  const handleRegionChange = (region: string) => {
    setRegionFocus(region);
    
    // In a real implementation, this would change the map view
    // to focus on the selected region
  };

  return (
    <Card className={`h-full ${className}`}>
      <MapHeader zoom={zoom} onZoomChange={handleZoomChange} />
      <CardContent className="p-0">
        <div className="flex h-full">
          <MapSidebar 
            layers={layers}
            regionFocus={regionFocus}
            onLayerToggle={handleLayerToggle}
            onOpacityChange={handleOpacityChange}
            onRegionChange={handleRegionChange}
          />
          <MapVisualization regionFocus={regionFocus} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Map;
