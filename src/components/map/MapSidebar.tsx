
import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LayerControl from './LayerControl';
import RegionSelector from './RegionSelector';
import { MapLayer } from '@/hooks/useMapData';

interface MapSidebarProps {
  layers: MapLayer[];
  regionFocus: string;
  onLayerToggle: (id: string) => void;
  onOpacityChange: (id: string, value: number[]) => void;
  onRegionChange: (region: string) => void;
  loading?: boolean;
}

const MapSidebar: React.FC<MapSidebarProps> = ({ 
  layers,
  regionFocus,
  onLayerToggle,
  onOpacityChange,
  onRegionChange,
  loading = false
}) => {
  return (
    <div className="w-80 border-r p-4 flex flex-col">
      <Tabs defaultValue="layers" className="h-full flex flex-col">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="layers">Layers</TabsTrigger>
          <TabsTrigger value="regions">Regions</TabsTrigger>
        </TabsList>
        <TabsContent value="layers" className="flex-1 overflow-auto">
          <Card className="p-4">
            <LayerControl
              layers={layers}
              onLayerToggle={onLayerToggle}
              onOpacityChange={onOpacityChange}
              loading={loading}
            />
          </Card>
        </TabsContent>
        <TabsContent value="regions" className="flex-1 overflow-auto">
          <Card className="p-4">
            <RegionSelector
              activeRegion={regionFocus}
              onRegionChange={onRegionChange}
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MapSidebar;
