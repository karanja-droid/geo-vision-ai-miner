
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LayersTab } from './sidebar-tabs/LayersTab';
import { LocationsTab } from './sidebar-tabs/LocationsTab';

interface MapLayer {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  opacity: number;
}

interface MapSidebarProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  layers: MapLayer[];
  handleLayerToggle: (id: string) => void;
  handleOpacityChange: (id: string, value: number[]) => void;
  mapType: string;
  toggleFullScreen: () => void;
  flyToLocation: (location: string) => void;
  highlightCountry: (country: string) => void;
  africaPolygons: {id: string, name: string, paths: {lat: number, lng: number}[], fillColor: string}[];
}

const MapSidebar: React.FC<MapSidebarProps> = ({
  activeTab,
  setActiveTab,
  layers,
  handleLayerToggle,
  handleOpacityChange,
  mapType,
  toggleFullScreen,
  flyToLocation,
  highlightCountry,
  africaPolygons
}) => {
  return (
    <div className="md:col-span-1">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="layers">Layers</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="layers" className="space-y-4">
          <LayersTab 
            layers={layers}
            mapType={mapType}
            handleLayerToggle={handleLayerToggle}
            handleOpacityChange={handleOpacityChange}
            toggleFullScreen={toggleFullScreen}
          />
        </TabsContent>
        
        <TabsContent value="locations" className="space-y-4">
          <LocationsTab 
            flyToLocation={flyToLocation}
            highlightCountry={highlightCountry}
            hasAfricaCountries={layers.find(l => l.id === 'africa-countries')?.visible || false}
            africaPolygons={africaPolygons}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MapSidebar;
