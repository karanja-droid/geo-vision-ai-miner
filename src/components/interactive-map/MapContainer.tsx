
import React, { useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, Polygon } from '@react-google-maps/api';
import { MapLayer } from '@/hooks/useMapData';
import { handleError } from '@/utils/errorHandler';

interface MapContainerProps {
  mapReady: boolean;
  center: {lat: number, lng: number};
  zoom: number;
  mapType: string;
  layers: MapLayer[];
  selectedMarker: {lat: number, lng: number, name: string, type: string, properties?: Record<string, any>} | null;
  setSelectedMarker: React.Dispatch<React.SetStateAction<{lat: number, lng: number, name: string, type: string, properties?: Record<string, any>} | null>>;
  sampleMarkers: {lng: number, lat: number, name: string, type: string, properties?: Record<string, any>}[];
  africaPolygons: {id: string, name: string, paths: {lat: number, lng: number}[], fillColor: string}[];
  handleMapLoad: () => void;
  getMapOptions: () => {
    mapTypeId: string;
    streetViewControl: boolean;
    fullscreenControl: boolean;
    mapTypeControl: boolean;
  };
}

const MapContainer: React.FC<MapContainerProps> = ({ 
  mapReady, 
  center, 
  zoom, 
  mapType, 
  layers, 
  selectedMarker, 
  setSelectedMarker,
  sampleMarkers,
  africaPolygons,
  handleMapLoad,
  getMapOptions
}) => {
  useEffect(() => {
    if (!mapReady) return;
    
    console.log("Map layers loaded:", layers.length);
  }, [mapReady, layers]);
  
  // Get points from layer data to display as markers
  const getMarkers = () => {
    try {
      const pointsLayers = layers.filter(
        layer => layer.visible && layer.type === 'point' && Array.isArray(layer.data)
      );
      
      if (!pointsLayers.length) return sampleMarkers;
      
      // Combine all visible point layers
      return pointsLayers.flatMap(layer => 
        layer.data.map((point: any) => ({
          lat: point.latitude,
          lng: point.longitude,
          name: point.name || `Point ${point.id.substring(0, 6)}`,
          type: point.type || 'general',
          properties: point.properties,
          sourceLayer: layer.id,
          color: layer.color || '#3B82F6'
        }))
      );
    } catch (error) {
      handleError(error, "Error processing map markers", "medium", {
        component: "MapContainer",
        action: "getMarkers"
      });
      return sampleMarkers;
    }
  };
  
  const markers = getMarkers();
  
  const getMarkerIcon = (type: string, sourceLayer?: string) => {
    // Define different marker colors based on point type or source layer
    if (sourceLayer === 'mines') {
      switch (type) {
        case 'active': return { url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' };
        case 'planned': return { url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' };
        case 'closed': return { url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' };
        default: return { url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png' };
      }
    }
    
    // Default marker icon for other layers
    return undefined;
  };

  return (
    <>
      <GoogleMap 
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={zoom}
        options={getMapOptions()}
        onLoad={handleMapLoad}
      >
        {/* Dynamic markers from layers */}
        {mapReady && markers.map((marker, index) => (
          <Marker
            key={`marker-${marker.sourceLayer || 'default'}-${index}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => setSelectedMarker(marker)}
            icon={getMarkerIcon(marker.type, marker.sourceLayer)}
          />
        ))}
        
        {/* Info window for selected marker */}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2">
              <h3 className="font-medium text-sm mb-1">{selectedMarker.name}</h3>
              <p className="text-xs text-gray-700">{selectedMarker.type}</p>
              
              {selectedMarker.properties && (
                <div className="mt-2 text-xs">
                  {selectedMarker.properties.minerals && (
                    <p>Minerals: {Array.isArray(selectedMarker.properties.minerals) 
                      ? selectedMarker.properties.minerals.join(', ') 
                      : selectedMarker.properties.minerals}
                    </p>
                  )}
                  {selectedMarker.properties.country && (
                    <p>Location: {selectedMarker.properties.country}</p>
                  )}
                </div>
              )}
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
              fillOpacity: layers.find(l => l.id === 'africa-countries')?.opacity || 0.6,
              strokeColor: '#000000',
              strokeOpacity: 0.8,
              strokeWeight: 1,
            }}
          />
        ))}
      </GoogleMap>
    </>
  );
};

export default MapContainer;
