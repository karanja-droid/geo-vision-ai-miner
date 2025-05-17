
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, Polygon, InfoWindow } from '@react-google-maps/api';
import { MapLayer } from '@/hooks/useMapData';

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
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Update the map type when it changes in parent component
  useEffect(() => {
    if (map) {
      map.setMapTypeId(mapType as google.maps.MapTypeId);
    }
  }, [map, mapType]);
  
  // Don't render until the Google Maps API is ready
  if (!mapReady) {
    return null;
  }
  
  // Get marker icon based on type
  const getMarkerIcon = (markerType: string) => {
    switch (markerType) {
      case 'mine':
        return {
          url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
        };
      case 'sample':
        return {
          url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
        };
      case 'hotspot':
        return {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
        };
      default:
        return {
          url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        };
    }
  };
  
  // Get polygon options based on layer
  const getPolygonOptions = (polygon: any) => {
    return {
      fillColor: polygon.fillColor || "#FF0000",
      fillOpacity: 0.35,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2
    };
  };
  
  // Function to handle marker click
  const handleMarkerClick = (marker: {lat: number, lng: number, name: string, type: string, properties?: Record<string, any>}) => {
    setSelectedMarker(marker);
  };
  
  return (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '100%'
      }}
      zoom={zoom}
      center={center}
      options={getMapOptions()}
      onLoad={(map) => {
        setMap(map);
        handleMapLoad();
      }}
      onClick={() => setSelectedMarker(null)}
    >
      {/* Render sample markers */}
      {sampleMarkers.map((marker, index) => {
        // Skip markers that don't match visible layers
        if (marker.type === 'mine' && !layers.find(l => l.id === 'mines')?.visible) return null;
        if (marker.type === 'hotspot') {
          const strength = marker.properties?.strength || 0.5;
          return (
            <Marker
              key={`${marker.type}-${index}`}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new google.maps.Size(30 + strength * 20, 30 + strength * 20)
              }}
              onClick={() => handleMarkerClick(marker)}
              opacity={0.8}
            />
          );
        }
        
        return (
          <Marker
            key={`${marker.type}-${index}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={getMarkerIcon(marker.type)}
            onClick={() => handleMarkerClick(marker)}
          />
        );
      })}
      
      {/* Render Africa polygons if that layer is visible */}
      {layers.find(l => l.id === 'africa-countries')?.visible && 
        africaPolygons.map((polygon) => (
          <Polygon
            key={polygon.id}
            paths={polygon.paths}
            options={getPolygonOptions(polygon)}
          />
        ))
      }
      
      {/* Info Window for selected marker */}
      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div className="p-1 max-w-xs">
            <h3 className="text-base font-semibold mb-1">{selectedMarker.name}</h3>
            <p className="text-sm mb-1">Type: {selectedMarker.type.charAt(0).toUpperCase() + selectedMarker.type.slice(1)}</p>
            {selectedMarker.properties && Object.entries(selectedMarker.properties).map(([key, value]) => (
              <div key={key} className="text-xs">
                <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}: </span>
                {typeof value === 'number' && key === 'strength' ? 
                  `${(value * 100).toFixed(1)}%` : 
                  String(value)
                }
              </div>
            ))}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapContainer;
