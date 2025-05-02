
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalysisResult } from '@/types';

interface AnalysisDetailsProps {
  results: AnalysisResult[];
}

const AnalysisDetails: React.FC<AnalysisDetailsProps> = ({ results }) => {
  // Function to format timestamp
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Function to get mineral color
  const getMineralColor = (mineral?: string): string => {
    switch(mineral) {
      case 'copper': return 'bg-mineral-copper text-white';
      case 'cobalt': return 'bg-mineral-cobalt text-white';
      case 'gold': return 'bg-mineral-gold text-black';
      case 'iron': return 'bg-mineral-iron text-white';
      case 'zinc': return 'bg-mineral-zinc text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="mt-4 space-y-4">
      {results.map(result => (
        <Card key={result.id} className="overflow-hidden">
          <CardHeader className="bg-muted/50 pb-2">
            <div className="flex flex-wrap justify-between items-center">
              <CardTitle className="text-base">
                Analysis #{result.id} - {result.modelType === 'prediction' ? 'Predictive Analysis' : 'Classification Results'}
              </CardTitle>
              <Badge className={getMineralColor(result.mineralType)}>
                {result.mineralType}
              </Badge>
            </div>
            <CardDescription>
              {formatDate(result.timestamp)} • Layer ID: {result.layerId}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Analysis Details</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Confidence:</span>
                      <span>{(Number(result.confidence) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Anomalies:</span>
                      <span>{result.data.anomalies}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hotspots:</span>
                      <span>{result.data.hotspots?.length || 0}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Mineral Properties</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span>{result.mineralType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Est. Grade:</span>
                      <span>Medium</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deposit Type:</span>
                      <span>Porphyry</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Hotspots</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {result.data.hotspots?.map((hotspot, index) => (
                    <div key={hotspot.id} className="bg-muted/50 p-2 rounded text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Hotspot #{hotspot.id}</span>
                        <Badge variant="outline">{(hotspot.strength * 100).toFixed(0)}%</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Lat: {hotspot.lat.toFixed(4)}, Lng: {hotspot.lng.toFixed(4)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnalysisDetails;
