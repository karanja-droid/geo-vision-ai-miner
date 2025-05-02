
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnalysisResult } from '@/types';
import { Link } from 'react-router-dom';

interface AnalysisMapProps {
  results: AnalysisResult[];
}

const AnalysisMap: React.FC<AnalysisMapProps> = ({ results }) => {
  return (
    <div className="mt-4">
      <Card>
        <CardContent className="p-0">
          <div className="aspect-[16/9] relative overflow-hidden rounded-md">
            <div className="absolute inset-0 grid-pattern"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Simplified visualization of hotspots */}
                {results.flatMap(result => 
                  (result.data.hotspots || []).map(hotspot => (
                    <div 
                      key={`${result.id}-${hotspot.id}`}
                      className="absolute rounded-full gradient-anomaly animate-pulse-slow"
                      style={{
                        top: `${(((90 - hotspot.lat) / 180) * 100)}%`,
                        left: `${(((180 + hotspot.lng) / 360) * 100)}%`,
                        width: `${hotspot.strength * 60 + 20}px`,
                        height: `${hotspot.strength * 60 + 20}px`,
                        backgroundColor: result.mineralType === 'copper' ? 'rgba(220,38,38,0.6)' : 
                                      result.mineralType === 'gold' ? 'rgba(234,179,8,0.6)' : 
                                      'rgba(52,152,219,0.6)'
                      }}
                    />
                  ))
                )}
                
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
              </div>
              
              {/* Interactive Map Notice */}
              <div className="absolute bottom-4 right-4">
                <Button asChild>
                  <Link to="/interactive-map">Open Interactive Map</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium mb-2">Distribution Heatmap</div>
            <p className="text-xs text-muted-foreground">
              Visualize the density of mineral deposits across the analyzed region.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium mb-2">Geological Overlays</div>
            <p className="text-xs text-muted-foreground">
              View mineral anomalies in relation to underlying geological formations.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium mb-2">Drilling Recommendations</div>
            <p className="text-xs text-muted-foreground">
              AI-generated optimal drilling locations based on analysis results.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisMap;
