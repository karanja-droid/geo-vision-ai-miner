
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AnalysisMapProps {
  hotspots: Array<{
    id: number;
    lat: number;
    lng: number;
    strength: number;
    mineralType?: string;
  }>;
  mineralType: string;
}

const AnalysisMap: React.FC<AnalysisMapProps> = ({ hotspots, mineralType }) => {
  const getGradientClass = () => {
    switch (mineralType) {
      case 'gold': return 'gradient-gold';
      case 'copper': return 'gradient-copper';
      case 'diamond': return 'gradient-diamond';
      case 'cobalt': return 'gradient-cobalt';
      case 'iron': return 'gradient-iron';
      default: return 'gradient-anomaly';
    }
  };
  
  const getMineralColor = (mineral?: string) => {
    if (!mineral) return 'bg-gray-400';
    
    switch (mineral.toLowerCase()) {
      case 'gold': return 'bg-amber-500 text-black';
      case 'copper': return 'bg-orange-600 text-white';
      case 'cobalt': return 'bg-indigo-600 text-white';
      case 'diamond': return 'bg-cyan-200 text-black';
      case 'iron': return 'bg-red-700 text-white';
      case 'lithium': return 'bg-lime-400 text-black';
      case 'platinum': return 'bg-gray-300 text-black';
      default: return 'bg-gray-400';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm">
          <span>Geological Analysis Map</span>
          <Badge className="text-xs">
            {mineralType.charAt(0).toUpperCase() + mineralType.slice(1)} Deposits
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[16/9] border rounded-md overflow-hidden">
          {/* Simplified map background with African geological features */}
          <div className="absolute inset-0 grid-pattern">
            {/* African geological features */}
            <div className="absolute top-[20%] left-[40%] w-24 h-24 bg-amber-100/20 rounded-full blur-md"></div>
            <div className="absolute bottom-[30%] right-[35%] w-32 h-32 bg-orange-100/20 rounded-full blur-md"></div>
            <div className="absolute top-[60%] left-[25%] w-36 h-36 bg-indigo-100/20 rounded-full blur-md"></div>
          </div>
          
          {/* Map Hotspots */}
          {hotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              style={{
                position: 'absolute',
                top: `${(1 - ((hotspot.lat + 30) / 60)) * 100}%`,
                left: `${((hotspot.lng + 30) / 60) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Hotspot pulse effect */}
              <div
                className={`absolute -inset-4 ${getGradientClass()} rounded-full animate-pulse-slow opacity-${Math.round(hotspot.strength * 100)}`}
                style={{ opacity: hotspot.strength }}
              ></div>
              
              {/* Hotspot point */}
              <div className={`w-4 h-4 rounded-full ${getMineralColor(hotspot.mineralType)} border-2 border-white relative z-10 flex items-center justify-center text-[8px] font-bold`}>
                {hotspot.id}
              </div>
            </div>
          ))}

          <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm p-1 rounded text-xs">
            Showing {hotspots.length} detected anomalies
          </div>
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-2">
          {hotspots.slice(0, 4).map(hotspot => (
            <div key={hotspot.id} className="text-xs border rounded p-1.5 bg-muted/10">
              <div className="flex justify-between mb-1">
                <span className="font-medium">Hotspot #{hotspot.id}</span>
                <Badge className={`${getMineralColor(hotspot.mineralType)} text-[8px]`}>
                  {hotspot.mineralType || 'Unknown'}
                </Badge>
              </div>
              <div className="text-[10px] text-muted-foreground">
                <div>Location: {hotspot.lat.toFixed(3)}, {hotspot.lng.toFixed(3)}</div>
                <div>Strength: {(hotspot.strength * 100).toFixed(1)}%</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisMap;
