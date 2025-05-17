
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { sampleMarkers, zambiaPolygon, drcPolygon } from '../components/interactive-map/constants';
import ApiKeyForm from '../components/interactive-map/ApiKeyForm';
import MapHeader from '../components/interactive-map/MapHeader';
import MapSidebar from '../components/interactive-map/MapSidebar';
import MapCardContainer from '../components/interactive-map/MapCardContainer';
import { useMapData, MapLayer } from '@/hooks/useMapData';
import { handleError } from '@/utils/errorHandler';
import FloatingFeedbackButton from '@/components/feedback/FloatingFeedbackButton';
import { AnalysisResult } from '@/types/analysis';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const InteractiveMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [apiKeySet, setApiKeySet] = useState<boolean>(false);
  const [mapReady, setMapReady] = useState<boolean>(false);
  const [center, setCenter] = useState<{lat: number, lng: number}>({ lat: 5.7832, lng: 19.4326 }); // Center on Africa
  const [zoom, setZoom] = useState<number>(3);
  const [selectedMarker, setSelectedMarker] = useState<{lat: number, lng: number, name: string, type: string, properties?: Record<string, any>} | null>(null);
  const [mapType, setMapType] = useState<string>('satellite');
  const [activeTab, setActiveTab] = useState<string>('layers');
  const [africaPolygons, setAfricaPolygons] = useState<any[]>([]);
  const [activeDatasetId, setActiveDatasetId] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  
  const { layers, loading, toggleLayer, updateOpacity } = useMapData(activeDatasetId);
  const { toast } = useToast();

  // Check for analysis results in localStorage
  useEffect(() => {
    const storedResult = localStorage.getItem('latestAnalysisResult');
    if (storedResult) {
      const result = JSON.parse(storedResult) as AnalysisResult;
      setAnalysisResult(result);
      
      // If we have hotspots, center the map on the first one
      if (result.data.hotspots && result.data.hotspots.length > 0) {
        const firstHotspot = result.data.hotspots[0];
        setCenter({ lat: firstHotspot.lat, lng: firstHotspot.lng });
        setZoom(8); // Zoom in to show the hotspot area
        
        toast({
          title: "Analysis Results Loaded",
          description: "Hotspots from your analysis are now visible on the map."
        });
      }
    }
  }, [toast]);

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
    try {
      if (id === 'terrain' || id === 'satellite' || id === 'roadmap') {
        // Update map type if it's a base layer
        const newType = id;
        setMapType(newType);
      }
      
      // Toggle the layer in our state
      toggleLayer(id);
    } catch (error) {
      handleError(error, "Failed to toggle map layer", "medium", {
        component: "InteractiveMap",
        action: "handleLayerToggle",
        additionalInfo: { layerId: id }
      });
    }
  };

  const handleOpacityChange = (id: string, value: number[]) => {
    try {
      updateOpacity(id, value[0]);
    } catch (error) {
      handleError(error, "Failed to update layer opacity", "low", {
        component: "InteractiveMap",
        action: "handleOpacityChange",
        additionalInfo: { layerId: id }
      });
    }
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

  // Add the analysis hotspots to the markers if available
  const enhancedMarkers = [...sampleMarkers];
  
  if (analysisResult && analysisResult.data.hotspots) {
    const hotspotMarkers = analysisResult.data.hotspots.map(hotspot => ({
      lat: hotspot.lat,
      lng: hotspot.lng,
      name: `Anomaly #${hotspot.id}`,
      type: 'hotspot',
      properties: {
        strength: hotspot.strength,
        confidence: analysisResult.confidence,
        mineralType: analysisResult.mineralType,
        analysisId: analysisResult.id
      }
    }));
    
    enhancedMarkers.push(...hotspotMarkers);
  }

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
        <>
          {analysisResult && (
            <Alert className="mb-4 bg-amber-100 border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <AlertTitle>Analysis Results Visible</AlertTitle>
              <AlertDescription>
                Showing {analysisResult.data.hotspots?.length || 0} potential mineral anomalies with {(analysisResult.confidence * 100).toFixed(1)}% confidence
              </AlertDescription>
            </Alert>
          )}
          
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
              loading={loading}
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
              sampleMarkers={enhancedMarkers}
              africaPolygons={africaPolygons}
              handleMapLoad={handleMapLoad}
              getMapOptions={getMapOptions}
            />
          </div>
        </>
      )}
      
      {/* Floating feedback button */}
      <FloatingFeedbackButton position="bottom-right" />
    </div>
  );
};

export default InteractiveMap;
