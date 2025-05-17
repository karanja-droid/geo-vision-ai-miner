
import React, { useRef } from 'react';
import { Card } from "@/components/ui/card";
import { LoadScript } from '@react-google-maps/api';
import MapContainer from './MapContainer';
import { MapLayer } from '@/hooks/useMapData';

interface MapCardContainerProps {
  apiKey: string;
  mapReady: boolean;
  setMapReady: React.Dispatch<React.SetStateAction<boolean>>;
  mapContainerRef: React.RefObject<HTMLDivElement>;
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

const MapCardContainer: React.FC<MapCardContainerProps> = ({
  apiKey,
  mapReady,
  setMapReady,
  mapContainerRef,
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
    <div className="md:col-span-3 relative">
      <Card className="h-[600px] w-full overflow-hidden">
        <div ref={mapContainerRef} className="absolute inset-0">
          <LoadScript googleMapsApiKey={apiKey} onLoad={() => setMapReady(true)}>
            <MapContainer
              mapReady={mapReady}
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
          </LoadScript>
        </div>
      </Card>
    </div>
  );
};

export default MapCardContainer;
