
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Database as DatabaseIcon, Layers, Upload, ZoomIn, ZoomOut } from "lucide-react";
import { useMapData } from '@/hooks/useMapData';

interface MapVisualizationProps {
  regionFocus: string;
  datasetId?: string;
}

const MapVisualization: React.FC<MapVisualizationProps> = ({ regionFocus, datasetId }) => {
  const { layers, loading } = useMapData(datasetId);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  
  // Get the visible points to display on the simplified map view
  const getVisiblePoints = () => {
    const pointLayers = layers.filter(layer => 
      layer.visible && 
      layer.type === 'point' && 
      Array.isArray(layer.data)
    );
    
    if (pointLayers.length === 0) return [];
    
    return pointLayers.flatMap(layer => 
      layer.data.map((point: any) => ({
        id: point.id,
        lat: point.latitude,
        lng: point.longitude,
        type: point.type,
        color: layer.color || '#3B82F6',
        opacity: layer.opacity
      }))
    );
  };
  
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  
  return (
    <div className="flex-grow h-[500px] relative">
      <div className="absolute inset-0 grid-pattern">
        <div 
          className="absolute inset-0 transition-transform duration-300" 
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-pulse text-center">
                <div className="w-12 h-12 rounded-full bg-geo-blue/30 flex items-center justify-center mx-auto mb-3">
                  <DatabaseIcon size={24} className="text-geo-blue/50" />
                </div>
                <p className="text-sm text-muted-foreground">Loading map data...</p>
              </div>
            </div>
          ) : getVisiblePoints().length === 0 ? (
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
          ) : null}
          
          {/* Simulated Visualization Overlay (for demonstration) */}
          <div className="absolute bottom-8 left-8 w-32 h-32 gradient-anomaly animate-pulse-slow opacity-60"></div>
          <div className="absolute top-20 right-24 w-24 h-24 gradient-anomaly animate-pulse-slow opacity-50"></div>
          <div className="absolute bottom-36 right-40 w-40 h-40 gradient-anomaly animate-pulse-slow opacity-70"></div>
          
          {/* Dynamic points from real data */}
          {getVisiblePoints().map(point => (
            <div 
              key={`point-${point.id}`}
              className="absolute rounded-full animate-pulse-slow"
              style={{
                top: `${(1 - ((point.lat + 90) / 180)) * 100}%`,
                left: `${((point.lng + 180) / 360) * 100}%`,
                width: '16px',
                height: '16px',
                backgroundColor: point.color,
                opacity: point.opacity,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
          
          {/* African geological features visualization */}
          {regionFocus !== 'global' && (
            <>
              <div className="absolute top-40 left-60 w-48 h-48 gradient-copper animate-pulse-slow opacity-60"></div>
              <div className="absolute bottom-60 right-60 w-36 h-36 gradient-gold animate-pulse-slow opacity-70"></div>
            </>
          )}
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col bg-white rounded-md shadow border">
        <Button variant="ghost" size="icon" className="rounded-none rounded-t-md border-b" onClick={handleZoomIn}>
          <ZoomIn size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-none rounded-b-md" onClick={handleZoomOut}>
          <ZoomOut size={18} />
        </Button>
      </div>
    </div>
  );
};

export default MapVisualization;
