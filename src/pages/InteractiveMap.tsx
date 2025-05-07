
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { sampleMarkers, zambiaPolygon, drcPolygon, defaultLayers } from '../components/interactive-map/constants';
import ApiKeyForm from '../components/interactive-map/ApiKeyForm';
import MapHeader from '../components/interactive-map/MapHeader';
import MapSidebar from '../components/interactive-map/MapSidebar';
import MapCardContainer from '../components/interactive-map/MapCardContainer';

interface MapLayer {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  opacity: number;
}

const InteractiveMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [apiKeySet, setApiKeySet] = useState<boolean>(false);
  const [mapReady, setMapReady] = useState<boolean>(false);
  const [center, setCenter] = useState<{lat: number, lng: number}>({ lat: 5.7832, lng: 19.4326 }); // Center on Africa
  const [zoom, setZoom] = useState<number>(3);
  const [selectedMarker, setSelectedMarker] = useState<{lat: number, lng: number, name: string, type: string} | null>(null);
  const [layers, setLayers] = useState<MapLayer[]>(defaultLayers);
  const [mapType, setMapType] = useState<string>('satellite');
  const [activeTab, setActiveTab] = useState<string>('layers');
  const [africaPolygons, setAfricaPolygons] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (apiKeySet && mapReady) {
      setAfricaPolygons([
        { id: 'zambia', name: 'Zambia', paths: zambiaPolygon, fillColor: '#FF9900' },
        { id: 'drc', name: 'Congo, DRC', paths: drcPolygon, fillColor: '#E31A1C' }
      ]);

      toast({
        title: "Map loaded successfully",
        description: "Interactive geological map is now ready to use"
      });
    }
  }, [apiKeySet, mapReady, toast]);

  const handleLayerToggle = (id: string) => {
    if (id === 'terrain' || id === 'satellite' || id === 'roadmap') {
      // Update map type if it's a base layer
      const newType = id;
      setMapType(newType);
      
      // Update layers
      setLayers(layers.map(layer => 
        (layer.id === 'terrain' || layer.id === 'satellite' || layer.id === 'roadmap') 
          ? { ...layer, visible: layer.id === id } 
          : layer
      ));
    } else {
      // Toggle other layers like Africa Countries
      setLayers(layers.map(layer => 
        layer.id === id ? { ...layer, visible: !layer.visible } : layer
      ));
    }
  };

  const handleOpacityChange = (id: string, value: number[]) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, opacity: value[0] } : layer
    ));
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setApiKeySet(true);
      toast({
        title: "API Key Set",
        description: "Initializing map with your Google Maps API key"
      });
    } else {
      toast({
        title: "API Key Required",
        description: "Please enter a valid Google Maps API key",
        variant: "destructive"
      });
    }
  };

  const flyToLocation = (location: string) => {
    // Sample locations to fly to
    const locations: {[key: string]: {lat: number, lng: number, zoom: number}} = {
      'usa': { lat: 37.0902, lng: -95.7129, zoom: 4 },
      'europe': { lat: 54.5260, lng: 15.2551, zoom: 4 },
      'africa': { lat: 5.7832, lng: 19.4326, zoom: 3 },
      'asia': { lat: 34.0479, lng: 103.8198, zoom: 3 },
      'australia': { lat: -25.2744, lng: 133.7751, zoom: 4 }
    };

    if (locations[location]) {
      setCenter(locations[location]);
      setZoom(locations[location].zoom);

      toast({
        title: "Location Changed",
        description: `Navigating to ${location.charAt(0).toUpperCase() + location.slice(1)}`
      });
    }
  };

  const highlightCountry = (country: string) => {
    if (country === 'Zambia') {
      setCenter({ lat: -13.1339, lng: 27.8493 });
      setZoom(6);
    } else if (country === 'Congo, DRC') {
      setCenter({ lat: -2.8766, lng: 23.6566 });
      setZoom(5);
    } else {
      setCenter({ lat: 5.7832, lng: 19.4326 });
      setZoom(3);
    }

    toast({
      title: "Country Highlighted",
      description: `Viewing geological data for ${country}`
    });
  };

  const toggleFullScreen = () => {
    const mapElement = mapContainerRef.current;
    if (!mapElement) return;

    if (!document.fullscreenElement) {
      mapElement.requestFullscreen().catch(err => {
        toast({
          title: "Fullscreen error",
          description: `Error attempting to enable fullscreen: ${err.message}`,
          variant: "destructive"
        });
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleMapLoad = () => {
    setMapReady(true);
  };

  const getMapOptions = () => {
    return {
      mapTypeId: mapType,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
    };
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <MapHeader mapReady={mapReady} />

      {!apiKeySet ? (
        <ApiKeyForm 
          apiKey={apiKey} 
          setApiKey={setApiKey} 
          onSubmit={handleApiKeySubmit} 
        />
      ) : (
        <div className="grid md:grid-cols-4 gap-4">
          <MapSidebar 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            layers={layers}
            handleLayerToggle={handleLayerToggle}
            handleOpacityChange={handleOpacityChange}
            mapType={mapType}
            toggleFullScreen={toggleFullScreen}
            flyToLocation={flyToLocation}
            highlightCountry={highlightCountry}
            africaPolygons={africaPolygons}
          />

          <MapCardContainer 
            apiKey={apiKey}
            mapReady={mapReady}
            setMapReady={setMapReady}
            mapContainerRef={mapContainerRef}
            center={center}
            zoom={zoom}
            mapType={mapType}
            layers={layers}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
            sampleMarkers={sampleMarkers}
            africaPolygons={africaPolygons}
            handleMapLoad={handleMapLoad}
            getMapOptions={getMapOptions}
          />
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
