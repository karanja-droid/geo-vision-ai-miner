
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  Map as MapIcon, 
  Layers, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  MapPin, 
  Navigation,
  Database,
  Globe
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { GoogleMap, LoadScript, Marker, Polygon, InfoWindow } from '@react-google-maps/api';

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
  const [layers, setLayers] = useState<MapLayer[]>([
    { id: 'terrain', name: 'Terrain', type: 'terrain', visible: false, opacity: 0.7 },
    { id: 'satellite', name: 'Satellite', type: 'satellite', visible: true, opacity: 1 },
    { id: 'roadmap', name: 'Streets', type: 'roadmap', visible: false, opacity: 0.8 },
    { id: 'africa-countries', name: 'Africa Countries', type: 'polygon', visible: false, opacity: 0.8 },
  ]);
  const [mapType, setMapType] = useState<string>('satellite');
  const [activeTab, setActiveTab] = useState<string>('layers');
  const [africaPolygons, setAfricaPolygons] = useState<any[]>([]);
  const { toast } = useToast();

  // Sample markers for geological sites
  const sampleMarkers = [
    { lng: -74.0060, lat: 40.7128, name: "Sample Site A", type: "Gold Deposit" },
    { lng: -118.2437, lat: 34.0522, name: "Sample Site B", type: "Copper Mine" },
    { lng: 2.3522, lat: 48.8566, name: "Sample Site C", type: "Iron Ore" },
    { lng: 139.6917, lat: 35.6895, name: "Sample Site D", type: "Rare Earth Elements" },
    { lng: -43.1729, lat: -22.9068, name: "Sample Site E", type: "Lithium Field" },
    { lng: 27.8493, lat: -13.1339, name: "Zambia Mine", type: "Copper Deposit" },
    { lng: 23.6566, lat: -2.8766, name: "DRC Site", type: "Cobalt Mine" },
  ];

  // Simplistic Africa country polygons for demonstration
  const zambiaPolygon = [
    { lat: -8.2, lng: 22.0 }, { lat: -8.2, lng: 33.0 }, 
    { lat: -18.0, lng: 33.0 }, { lat: -18.0, lng: 22.0 }
  ];
  
  const drcPolygon = [
    { lat: 5.4, lng: 12.2 }, { lat: 5.4, lng: 31.3 }, 
    { lat: -13.5, lng: 31.3 }, { lat: -13.5, lng: 12.2 }
  ];

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
  }, [apiKeySet, mapReady]);

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
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-center mb-2">Interactive Geological Map</h1>
        <p className="text-center text-muted-foreground mb-6">
          Explore geological features and mineral deposits across Africa
        </p>
      </div>

      {!apiKeySet ? (
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Enter Google Maps API Key</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleApiKeySubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter your Google Maps API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Get your API key from <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noreferrer" className="underline">Google Cloud Console</a>
                </p>
              </div>
              <Button type="submit" className="w-full">Load Map</Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-4 gap-4">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="layers">Layers</TabsTrigger>
                <TabsTrigger value="locations">Locations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="layers" className="space-y-4">
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
              </TabsContent>
              
              <TabsContent value="locations" className="space-y-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Navigation className="h-4 w-4 mr-2" />
                      Navigate To
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-left flex items-center justify-start" 
                      onClick={() => flyToLocation('africa')}
                    >
                      <Globe className="h-4 w-4 mr-2" /> All Africa
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-left flex items-center justify-start" 
                      onClick={() => highlightCountry('Zambia')}
                    >
                      <MapPin className="h-4 w-4 mr-2" /> Zambia
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-left flex items-center justify-start" 
                      onClick={() => highlightCountry('Congo, DRC')}
                    >
                      <MapPin className="h-4 w-4 mr-2" /> Democratic Republic of Congo
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-left flex items-center justify-start" 
                      onClick={() => flyToLocation('usa')}
                    >
                      <MapPin className="h-4 w-4 mr-2" /> North America
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-left flex items-center justify-start" 
                      onClick={() => flyToLocation('europe')}
                    >
                      <MapPin className="h-4 w-4 mr-2" /> Europe
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-left flex items-center justify-start" 
                      onClick={() => flyToLocation('australia')}
                    >
                      <MapPin className="h-4 w-4 mr-2" /> Australia
                    </Button>
                  </CardContent>
                </Card>

                {layers.find(l => l.id === 'africa-countries')?.visible && (
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        Africa Countries
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="text-xs text-muted-foreground mb-2">
                        Africa Countries dataset has been integrated.
                      </p>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          flyToLocation('africa');
                        }}
                      >
                        <Globe className="h-4 w-4 mr-2" /> Show Africa Countries
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Map */}
          <div className="md:col-span-3 relative">
            <Card className="h-[600px] w-full overflow-hidden">
              <div ref={mapContainerRef} className="absolute inset-0">
                <LoadScript googleMapsApiKey={apiKey} onLoad={() => setMapReady(true)}>
                  <GoogleMap 
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={center}
                    zoom={zoom}
                    options={getMapOptions()}
                    onLoad={handleMapLoad}
                  >
                    {/* Markers for geological sites */}
                    {sampleMarkers.map((marker, index) => (
                      <Marker
                        key={`marker-${index}`}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onClick={() => setSelectedMarker(marker)}
                      />
                    ))}
                    
                    {/* Info window for selected marker */}
                    {selectedMarker && (
                      <InfoWindow
                        position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                        onCloseClick={() => setSelectedMarker(null)}
                      >
                        <div>
                          <h3 className="font-medium">{selectedMarker.name}</h3>
                          <p className="text-sm">{selectedMarker.type}</p>
                        </div>
                      </InfoWindow>
                    )}

                    {/* Africa country polygons */}
                    {layers.find(l => l.id === 'africa-countries')?.visible && africaPolygons.map((polygon) => (
                      <Polygon
                        key={polygon.id}
                        paths={polygon.paths}
                        options={{
                          fillColor: polygon.fillColor,
                          fillOpacity: layers.find(l => l.id === 'africa-countries')?.opacity || 0.8,
                          strokeColor: '#000000',
                          strokeOpacity: 0.8,
                          strokeWeight: 1,
                        }}
                      />
                    ))}
                  </GoogleMap>
                </LoadScript>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
