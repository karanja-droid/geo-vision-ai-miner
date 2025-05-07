
import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow, Polygon } from '@react-google-maps/api';

interface MapContainerProps {
  mapReady: boolean;
  center: {lat: number, lng: number};
  zoom: number;
  mapType: string;
  layers: MapLayer[];
  selectedMarker: {lat: number, lng: number, name: string, type: string} | null;
  setSelectedMarker: React.Dispatch<React.SetStateAction<{lat: number, lng: number, name: string, type: string} | null>>;
  sampleMarkers: {lng: number, lat: number, name: string, type: string}[];
  africaPolygons: {id: string, name: string, paths: {lat: number, lng: number}[], fillColor: string}[];
  handleMapLoad: () => void;
  getMapOptions: () => {
    mapTypeId: string;
    streetViewControl: boolean;
    fullscreenControl: boolean;
    mapTypeControl: boolean;
  };
}

interface MapLayer {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  opacity: number;
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
  return (
    <>
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
    </>
  );
};

export default MapContainer;
