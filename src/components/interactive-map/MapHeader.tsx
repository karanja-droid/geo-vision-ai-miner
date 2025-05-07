
import React from 'react';
import { useToast } from "@/components/ui/use-toast";

interface MapHeaderProps {
  mapReady: boolean;
}

const MapHeader: React.FC<MapHeaderProps> = ({ mapReady }) => {
  return (
    <div className="mb-4">
      <h1 className="text-3xl font-bold text-center mb-2">Interactive Geological Map</h1>
      <p className="text-center text-muted-foreground mb-6">
        Explore geological features and mineral deposits across Africa
        {!mapReady && " (Loading...)"}
      </p>
    </div>
  );
};

export default MapHeader;
