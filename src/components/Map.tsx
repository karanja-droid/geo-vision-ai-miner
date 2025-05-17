
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import MapHeader from './map/MapHeader';
import MapSidebar from './map/MapSidebar';
import MapVisualization from './map/MapVisualization';
import { useMapData } from '@/hooks/useMapData';

interface MapProps {
  className?: string;
  datasetId?: string;
}

const Map: React.FC<MapProps> = ({ className, datasetId }) => {
  const [zoom, setZoom] = useState<number>(50);
  const [regionFocus, setRegionFocus] = useState<string>('global');
  
  const { layers, loading, toggleLayer, updateOpacity } = useMapData(datasetId);

  const handleLayerToggle = (id: string) => {
    toggleLayer(id);
  };

  const handleOpacityChange = (id: string, value: number[]) => {
    updateOpacity(id, value[0]);
  };

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0]);
  };

  const handleRegionChange = (region: string) => {
    setRegionFocus(region);
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
            loading={loading}
          />
          <MapVisualization 
            regionFocus={regionFocus} 
            datasetId={datasetId} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Map;
