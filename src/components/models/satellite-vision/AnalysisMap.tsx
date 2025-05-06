
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Layers } from "lucide-react";

interface Hotspot {
  id: number;
  lat: number;
  lng: number;
  strength: number;
}

interface AnalysisMapProps {
  hotspots: Hotspot[];
  mineralType?: string;
}

const AnalysisMap: React.FC<AnalysisMapProps> = ({ hotspots, mineralType = 'unknown' }) => {
  // Function to determine color based on mineral type
  const getMineralColor = (type: string): string => {
    switch(type) {
      case 'copper': return 'rgba(217, 119, 6, 0.6)';
      case 'gold': return 'rgba(251, 191, 36, 0.6)';
      case 'cobalt': return 'rgba(37, 99, 235, 0.6)';
      case 'iron': return 'rgba(127, 29, 29, 0.6)';
      case 'zinc': return 'rgba(100, 116, 139, 0.6)';
      default: return 'rgba(234, 179, 8, 0.6)';
    }
  };

  return (
    <Card className="mt-4 overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-[16/9] relative overflow-hidden rounded-md">
          <div className="absolute inset-0 grid-pattern"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full relative">
              {/* Render hotspots */}
              {hotspots.map(hotspot => (
                <div 
                  key={hotspot.id}
                  className="absolute rounded-full animate-pulse-slow"
                  style={{
                    top: `${(((90 - hotspot.lat) / 180) * 100)}%`,
                    left: `${(((180 + hotspot.lng) / 360) * 100)}%`,
                    width: `${hotspot.strength * 60 + 20}px`,
                    height: `${hotspot.strength * 60 + 20}px`,
                    backgroundColor: getMineralColor(mineralType)
                  }}
                >
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Strength: {(hotspot.strength * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
              
              {/* Map legend */}
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded text-xs">
                <div className="font-medium mb-1">Hotspot Intensity</div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 rounded-full bg-red-500/30 mr-1"></span>Low
                  <span className="inline-block w-3 h-3 rounded-full bg-red-500/50 mx-1"></span>Medium
                  <span className="inline-block w-3 h-3 rounded-full bg-red-500/70 mx-1"></span>High
                  <span className="inline-block w-3 h-3 rounded-full bg-red-500/90 ml-1"></span>Very High
                </div>
              </div>
              
              {/* Info overlay */}
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded text-xs">
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2">
                    {mineralType.charAt(0).toUpperCase() + mineralType.slice(1)}
                  </Badge>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{hotspots.length} hotspots</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map features indicator */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <Badge variant="secondary" className="flex items-center">
              <Layers className="h-3 w-3 mr-1" />
              Satellite
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <Layers className="h-3 w-3 mr-1" />
              Mineral
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisMap;
