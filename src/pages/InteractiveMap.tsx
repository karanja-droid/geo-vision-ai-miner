import React, { useEffect, useRef, useState } from 'react';
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
    { id: 'africa-countries', name: 'Africa Countries', type: 'vector', source: 'arcgis', visible: false, opacity: 0.8 },
  ]);
  const [activeTab, setActiveTab] = useState<string>('layers');
  const [arcgisDataLoaded, setArcgisDataLoaded] = useState<boolean>(false);
  const { toast } = useToast();

  // Function to load ArcGIS Africa Countries data
  const loadAfricaCountriesData = async () => {
    if (!map.current || arcgisDataLoaded) return;

    try {
      // Fetch GeoJSON data from ArcGIS Hub
      const response = await fetch('https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Countries/FeatureServer/0/query?where=CONTINENT%3D%27Africa%27&outFields=*&outSR=4326&f=geojson');
      const data = await response.json();
      
      // Add the source to the map
      map.current.addSource('africa-countries-source', {
        type: 'geojson',
        data: data
      });
      
      // Add the layer to the map
      map.current.addLayer({
        id: 'africa-countries',
        type: 'fill',
        source: 'africa-countries-source',
        layout: {
          visibility: 'none'
        },
        paint: {
          'fill-color': [
            'case',
            ['==', ['get', 'COUNTRY'], 'Zambia'], '#ff9900',
            ['==', ['get', 'COUNTRY'], 'Congo, DRC'], '#e31a1c',
            '#3388ff'
          ],
          'fill-opacity': 0.8,
          'fill-outline-color': '#000'
        }
      });

      // Add outline layer
      map.current.addLayer({
        id: 'africa-countries-outline',
        type: 'line',
        source: 'africa-countries-source',
        layout: {
          visibility: 'none'
        },
        paint: {
          'line-color': '#000',
          'line-width': 1
        }
      });

      // Add popup on hover
      map.current.on('mouseenter', 'africa-countries', (e) => {
        if (e.features && e.features[0]) {
          map.current!.getCanvas().style.cursor = 'pointer';
          
          const coordinates = e.lngLat;
          const countryName = e.features[0].properties?.COUNTRY || 'Unknown';
          const region = e.features[0].properties?.REGION || 'Unknown';
          
          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`<h3>${countryName}</h3><p>Region: ${region}</p>`)
            .addTo(map.current!);
        }
      });
      
      map.current.on('mouseleave', 'africa-countries', () => {
        map.current!.getCanvas().style.cursor = '';
        const popups = document.getElementsByClassName('mapboxgl-popup');
        if (popups.length) {
          popups[0].remove();
        }
      });

      setArcgisDataLoaded(true);
      toast({
        title: "Africa Countries Data Loaded",
        description: "ArcGIS Africa Countries dataset has been integrated"
      });
    } catch (error) {
      console.error("Error loading Africa Countries data:", error);
      toast({
        title: "Error Loading Data",
        description: "Failed to load Africa Countries dataset from ArcGIS",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (!apiKeySet || !mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = apiKey;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [19.4326, 5.7832], // Center on Africa
        zoom: 2.5,
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
        
        // Load ArcGIS Africa Countries data
        loadAfricaCountriesData();
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
        try {
          if (id === 'africa-countries' && map.current.getLayer('africa-countries')) {
            const visibility = !layer.visible ? 'visible' : 'none';
            map.current.setLayoutProperty('africa-countries', 'visibility', visibility);
            map.current.setLayoutProperty('africa-countries-outline', 'visibility', visibility);
          } else if (map.current.getLayer(id)) {
            const visibility = !layer.visible ? 'visible' : 'none';
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
          if (id === 'africa-countries' && map.current.getLayer('africa-countries')) {
            map.current.setPaintProperty('africa-countries', 'fill-opacity', layer.opacity);
          } else if (map.current.getLayer(id)) {
            if (layer.type === 'raster') {
              map.current.setPaintProperty(id, 'raster-opacity', layer.opacity);
            }
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

  // Function to highlight a specific country
  const highlightCountry = (country: string) => {
    if (!map.current || !arcgisDataLoaded) return;

    try {
      map.current.setPaintProperty('africa-countries', 'fill-color', [
        'case',
        ['==', ['get', 'COUNTRY'], country], '#ff0000',
        ['==', ['get', 'COUNTRY'], 'Zambia'], '#ff9900',
        ['==', ['get', 'COUNTRY'], 'Congo, DRC'], '#e31a1c',
        '#3388ff'
      ]);

      // Find coordinates for the country and fly to it
      map.current.flyTo({
        center: 
          country === 'Zambia' ? [27.8493, -13.1339] : 
          country === 'Congo, DRC' ? [23.6566, -2.8766] : 
          [19.4326, 5.7832],
        essential: true,
        zoom: country ? 5 : 3,
        duration: 2000
      });

      toast({
        title: "Country Highlighted",
        description: `Viewing geological data for ${country}`
      });
    } catch (e) {
      console.error('Error highlighting country:', e);
    }
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
                      onClick={() => flyToLocation('africa')}>
                      <Globe className="h-4 w-4 mr-2" /> All Africa
                    </Button>
                    <Button variant="outline" size="sm" className="w-full text-left flex items-center justify-start" 
                      onClick={() => highlightCountry('Zambia')}>
                      <MapPin className="h-4 w-4 mr-2" /> Zambia
                    </Button>
                    <Button variant="outline" size="sm" className="w-full text-left flex items-center justify-start" 
                      onClick={() => highlightCountry('Congo, DRC')}>
                      <MapPin className="h-4 w-4 mr-2" /> Democratic Republic of Congo
                    </Button>
                    <Button variant="outline" size="sm" className="w-full text-left flex items-center justify-start" 
                      onClick={() => flyToLocation('usa')}>
                      <MapPin className="h-4 w-4 mr-2" /> North America
                    </Button>
                    <Button variant="outline" size="sm" className="w-full text-left flex items-center justify-start" 
                      onClick={() => flyToLocation('europe')}>
                      <MapPin className="h-4 w-4 mr-2" /> Europe
                    </Button>
                    <Button variant="outline" size="sm" className="w-full text-left flex items-center justify-start" 
                      onClick={() => flyToLocation('australia')}>
                      <MapPin className="h-4 w-4 mr-2" /> Australia
                    </Button>
                  </CardContent>
                </Card>

                {arcgisDataLoaded && (
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        ArcGIS Dataset
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="text-xs text-muted-foreground mb-2">
                        Africa Countries dataset has been integrated from ArcGIS Hub.
                      </p>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          // Enable Africa Countries layer if not already visible
                          if (!layers.find(l => l.id === 'africa-countries')?.visible) {
                            handleLayerToggle('africa-countries');
                          }
                          // Fly to Africa
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
              <div ref={mapContainer} className="absolute inset-0" />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
