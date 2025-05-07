
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Database as DatabaseIcon, Layers, Upload, ZoomIn, ZoomOut } from "lucide-react";

interface MapVisualizationProps {
  regionFocus: string;
}

const MapVisualization: React.FC<MapVisualizationProps> = ({ regionFocus }) => {
  return (
    <div className="flex-grow h-[500px] relative">
      <div className="absolute inset-0 grid-pattern">
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-4 rounded-lg bg-white/80 backdrop-blur-sm border">
            <div className="w-12 h-12 rounded-full bg-geo-blue text-white flex items-center justify-center mx-auto mb-3">
              <DatabaseIcon size={24} />
            </div>
            <h3 className="text-lg font-medium text-geo-blue mb-1">
              {regionFocus === 'global' ? 'Global Map Preview' : 
               regionFocus === 'africa' ? 'Africa Map Preview' : 
               regionFocus === 'zambia' ? 'Zambia Map Preview' : 
               'DRC Map Preview'}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {regionFocus === 'global' ? 'Upload geological data to visualize on the map' :
               `Explore ${regionFocus === 'africa' ? 'African' : regionFocus} geological datasets`}
            </p>
            <div className="space-x-2">
              <Button size="sm" asChild>
                <Link to="/dataset-management">
                  <Upload size={14} className="mr-1" /> Upload Data
                </Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link to="/interactive-map">
                  <Layers size={14} className="mr-1" /> Full Map
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Simulated Visualization Overlay (for demonstration) */}
        <div className="absolute bottom-8 left-8 w-32 h-32 gradient-anomaly animate-pulse-slow opacity-60"></div>
        <div className="absolute top-20 right-24 w-24 h-24 gradient-anomaly animate-pulse-slow opacity-50"></div>
        <div className="absolute bottom-36 right-40 w-40 h-40 gradient-anomaly animate-pulse-slow opacity-70"></div>
        
        {/* African geological features visualization */}
        {regionFocus !== 'global' && (
          <>
            <div className="absolute top-40 left-60 w-48 h-48 gradient-copper animate-pulse-slow opacity-60"></div>
            <div className="absolute bottom-60 right-60 w-36 h-36 gradient-gold animate-pulse-slow opacity-70"></div>
          </>
        )}
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col bg-white rounded-md shadow border">
        <Button variant="ghost" size="icon" className="rounded-none rounded-t-md border-b">
          <ZoomIn size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-none rounded-b-md">
          <ZoomOut size={18} />
        </Button>
      </div>
    </div>
  );
};

export default MapVisualization;
