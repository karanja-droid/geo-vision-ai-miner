
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { 
  Map as MapIcon, 
  Layers, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  MapPin, 
  Navigation 
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from "@/components/ui/use-toast";

interface MapLayer {
  id: string;
  name: string;
  type: string;
  source: string;
  visible: boolean;
  opacity: number;
}

const InteractiveMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [apiKeySet, setApiKeySet] = useState<boolean>(false);
  const [mapReady, setMapReady] = useState<boolean>(false);
  const [layers, setLayers] = useState<MapLayer[]>([
    { id: 'satellite', name: 'Satellite Imagery', type: 'raster', source: 'mapbox://mapbox.satellite', visible: true, opacity: 1 },
    { id: 'terrain', name: 'Terrain', type: 'raster', source: 'mapbox://mapbox.terrain-rgb', visible: false, opacity: 0.7 },
    { id: 'streets', name: 'Streets', type: 'vector', source: 'mapbox://mapbox.mapbox-streets-v8', visible: false, opacity: 0.8 },
  ]);
  const [activeTab, setActiveTab] = useState<string>('layers');
  const { toast } = useToast();

  useEffect(() => {
    if (!apiKeySet || !mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = apiKey;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [0, 20], // Center on global view
        zoom: 1.5,
        pitch: 30,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Add scale control
      map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');

      // Add geolocate control
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true
        }), 
        'top-right'
      );

      map.current.on('load', () => {
        setMapReady(true);
        toast({
          title: "Map loaded successfully",
          description: "Interactive geological map is now ready to use"
        });

        // Add 3D terrain if supported
        if (map.current) {
          map.current.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
          });
          map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
        }

        // Add sample geological marker
        addSampleMarkers();
      });

      return () => {
        if (map.current) {
          map.current.remove();
        }
      };
    } catch (error) {
      toast({
        title: "Error initializing map",
        description: "Please check your API key and try again",
        variant: "destructive"
      });
    }
  }, [apiKeySet, apiKey]);

  const addSampleMarkers = () => {
    if (!map.current) return;

    // Add some sample geological markers
    const samples = [
      { lng: -74.0060, lat: 40.7128, name: "Sample Site A", type: "Gold Deposit" },
      { lng: -118.2437, lat: 34.0522, name: "Sample Site B", type: "Copper Mine" },
      { lng: 2.3522, lat: 48.8566, name: "Sample Site C", type: "Iron Ore" },
      { lng: 139.6917, lat: 35.6895, name: "Sample Site D", type: "Rare Earth Elements" },
      { lng: -43.1729, lat: -22.9068, name: "Sample Site E", type: "Lithium Field" },
    ];

    samples.forEach((sample) => {
      const marker = document.createElement('div');
      marker.className = 'marker';
      marker.style.width = '24px';
      marker.style.height = '24px';
      marker.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ffa500" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;

      new mapboxgl.Marker(marker)
        .setLngLat([sample.lng, sample.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3>${sample.name}</h3><p>${sample.type}</p>`)
        )
        .addTo(map.current);
    });
  };

  const handleLayerToggle = (id: string) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, visible: !layer.visible } : layer
    ));

    // Update layer visibility on the map
    if (map.current && mapReady) {
      const layer = layers.find(l => l.id === id);
      if (layer) {
        const visibility = !layer.visible ? 'visible' : 'none';
        try {
          if (map.current.getLayer(id)) {
            map.current.setLayoutProperty(id, 'visibility', visibility);
          }
        } catch (e) {
          console.log('Layer may not be added to map yet:', e);
        }
      }
    }
  };

  const handleOpacityChange = (id: string, value: number[]) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, opacity: value[0] } : layer
    ));

    // Update layer opacity on the map
    if (map.current && mapReady) {
      const layer = layers.find(l => l.id === id);
      if (layer) {
        try {
          if (map.current.getLayer(id)) {
            map.current.setPaintProperty(id, 'raster-opacity', layer.opacity);
          }
        } catch (e) {
          console.log('Layer may not be added to map yet:', e);
        }
      }
    }
  };

  const toggleFullScreen = () => {
    const mapElement = mapContainer.current;
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

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setApiKeySet(true);
      toast({
        title: "API Key Set",
        description: "Initializing map with your Mapbox API key"
      });
    } else {
      toast({
        title: "API Key Required",
        description: "Please enter a valid Mapbox API key",
        variant: "destructive"
      });
    }
  };

  const flyToLocation = (location: string) => {
    if (!map.current) return;

    // Sample locations to fly to
    const locations: {[key: string]: [number, number]} = {
      'usa': [-95.7129, 37.0902],
      'europe': [15.2551, 54.5260],
      'africa': [19.4326, 5.7832],
      'asia': [103.8198, 34.0479],
      'australia': [133.7751, -25.2744]
    };

    if (locations[location]) {
      map.current.flyTo({
        center: locations[location],
        essential: true,
        zoom: 3,
        duration: 2000
      });

      toast({
        title: "Location Changed",
        description: `Navigating to ${location.charAt(0).toUpperCase() + location.slice(1)}`
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-center mb-2">Interactive Geological Map</h1>
        <p className="text-center text-muted-foreground mb-6">
          Explore geological features and mineral deposits around the world
        </p>
      </div>

      {!apiKeySet ? (
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Enter Mapbox API Key</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleApiKeySubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter your Mapbox API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Get your free API key from <a href="https://mapbox.com/" target="_blank" rel="noreferrer" className="underline">Mapbox</a>
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
                    <Button variant="outline" size="sm" className="w-full flex items-center justify-center" 
                      onClick={toggleFullScreen}>
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
                    <Button variant="outline" size="sm" className="w-full text-left flex items-center justify-start" 
                      onClick={() => flyToLocation('usa')}>
                      <MapPin className="h-4 w-4 mr-2" /> North America
                    </Button>
                    <Button variant="outline" size="sm" className="w-full text-left flex items-center justify-start" 
                      onClick={() => flyToLocation('europe')}>
                      <MapPin className="h-4 w-4 mr-2" /> Europe
                    </Button>
                    <Button variant="outline" size="sm" className="w-full text-left flex items-center justify-start" 
                      onClick={() => flyToLocation('africa')}>
                      <MapPin className="h-4 w-4 mr-2" /> Africa
                    </Button>
                    <Button variant="outline" size="sm" className="w-full text-left flex items-center justify-start" 
                      onClick={() => flyToLocation('asia')}>
                      <MapPin className="h-4 w-4 mr-2" /> Asia
                    </Button>
                    <Button variant="outline" size="sm" className="w-full text-left flex items-center justify-start" 
                      onClick={() => flyToLocation('australia')}>
                      <MapPin className="h-4 w-4 mr-2" /> Australia
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Map */}
          <div className="md:col-span-3 relative">
            <Card className="h-[600px] w-full overflow-hidden">
              <div ref={mapContainer} className="absolute inset-0" />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
