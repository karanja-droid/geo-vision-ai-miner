
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Map as MapIcon } from 'lucide-react';

interface MineData {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    country: string;
    region?: string;
  };
  minerals: string[];
  status: 'active' | 'inactive' | 'planned' | 'closed';
  production?: {
    mineral: string;
    amount: number;
    unit: string;
    year: number;
  }[];
  owner?: string;
  description?: string;
}

interface MinesVisualizationProps {
  mines: MineData[];
  isLoading: boolean;
}

const MinesVisualization: React.FC<MinesVisualizationProps> = ({ mines, isLoading }) => {
  const [selectedMine, setSelectedMine] = useState<MineData | null>(null);
  const [zoom, setZoom] = useState(1);
  
  const handleZoomIn = () => setZoom(Math.min(zoom + 0.2, 3));
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.2, 0.5));
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-mineral-copper';
      case 'inactive': return 'bg-mineral-gold';
      case 'planned': return 'bg-mineral-zinc';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getMineralColor = (mineral: string) => {
    const lowerMineral = mineral.toLowerCase();
    if (lowerMineral.includes('gold')) return 'gradient-gold';
    if (lowerMineral.includes('copper')) return 'gradient-copper';
    if (lowerMineral.includes('iron')) return 'gradient-iron';
    if (lowerMineral.includes('cobalt')) return 'gradient-cobalt';
    return 'gradient-anomaly';
  };
  
  return (
    <Card className="h-[600px] relative overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between">
          <span>Mines Geographic Distribution</span>
          <Badge variant="outline">{mines.length} mines</Badge>
        </CardTitle>
        <CardDescription>Visualizing global mining operations</CardDescription>
      </CardHeader>
      <CardContent className="p-0 relative h-[calc(100%-4rem)]">
        {/* Map visualization */}
        <div 
          className="absolute inset-0 grid-pattern bg-slate-50"
          style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }}
        >
          {/* Simulated map background */}
          <div className="absolute inset-0 opacity-20">
            {/* Africa shape */}
            <div className="absolute w-1/4 h-1/3 bg-slate-300 rounded-full" 
                 style={{ top: '30%', left: '45%' }}></div>
            {/* South America shape */}
            <div className="absolute w-1/6 h-1/4 bg-slate-300 rounded-full" 
                 style={{ top: '40%', left: '30%' }}></div>
            {/* North America shape */}
            <div className="absolute w-1/5 h-1/4 bg-slate-300 rounded-full" 
                 style={{ top: '20%', left: '20%' }}></div>
            {/* Europe shape */}
            <div className="absolute w-1/8 h-1/6 bg-slate-300 rounded-full" 
                 style={{ top: '20%', left: '50%' }}></div>
            {/* Asia shape */}
            <div className="absolute w-1/3 h-1/3 bg-slate-300 rounded-full" 
                 style={{ top: '25%', left: '65%' }}></div>
            {/* Australia shape */}
            <div className="absolute w-1/8 h-1/10 bg-slate-300 rounded-full" 
                 style={{ top: '55%', left: '75%' }}></div>
          </div>
          
          {/* Mine markers */}
          {mines.map((mine) => {
            // Convert latitude/longitude to relative position
            const xPosition = ((mine.location.longitude + 180) / 360) * 100;
            const yPosition = ((90 - mine.location.latitude) / 180) * 100;
            
            return (
              <div 
                key={mine.id}
                className={`absolute ${getStatusColor(mine.status)} cursor-pointer w-3 h-3 rounded-full 
                           transform -translate-x-1/2 -translate-y-1/2 border border-white hover:scale-150 transition-all`}
                style={{ 
                  left: `${xPosition}%`, 
                  top: `${yPosition}%`,
                }}
                onClick={() => setSelectedMine(mine)}
              />
            );
          })}
          
          {/* Mine visualization effects */}
          {mines.filter(m => m.status === 'active').slice(0, 5).map((mine, index) => {
            const xPosition = ((mine.location.longitude + 180) / 360) * 100;
            const yPosition = ((90 - mine.location.latitude) / 180) * 100;
            const mineralClass = getMineralColor(mine.minerals[0] || '');
            
            return (
              <div 
                key={`effect-${mine.id}`}
                className={`absolute ${mineralClass} w-12 h-12 rounded-full animate-pulse-slow opacity-40`}
                style={{ 
                  left: `${xPosition}%`, 
                  top: `${yPosition}%`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${index * 0.5}s`
                }}
              />
            );
          })}
          
          {/* Selected mine info */}
          {selectedMine && (
            <div 
              className="absolute bg-white p-3 rounded shadow-lg border z-10"
              style={{ 
                left: `${((selectedMine.location.longitude + 180) / 360) * 100}%`, 
                top: `${((90 - selectedMine.location.latitude) / 180) * 100 - 10}%`,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-sm">{selectedMine.name}</h3>
                <Badge className={`${getStatusColor(selectedMine.status)} text-white text-xs`}>
                  {selectedMine.status}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {selectedMine.location.country}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedMine.minerals.map((mineral, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">{mineral}</Badge>
                ))}
              </div>
              {selectedMine.owner && (
                <div className="text-xs mt-2">
                  <span className="text-muted-foreground">Owner: </span>
                  {selectedMine.owner}
                </div>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 w-full text-xs"
                onClick={() => setSelectedMine(null)}
              >
                Close
              </Button>
            </div>
          )}
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
        
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div className="text-center">
              <MapIcon className="h-10 w-10 animate-pulse text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Loading mines data...</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MinesVisualization;
