
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Layers, Database } from "lucide-react";
import { AnalysisResult } from '@/types';

// Mock analysis results
const initialResults: AnalysisResult[] = [
  {
    id: '1',
    layerId: '1',
    timestamp: '2024-02-15T14:30:00Z',
    modelType: 'prediction',
    confidence: 0.87,
    mineralType: 'copper',
    data: {
      anomalies: 3,
      hotspots: [
        { id: 1, lat: 37.7749, lng: -122.4194, strength: 0.9 },
        { id: 2, lat: 37.7848, lng: -122.4294, strength: 0.75 },
        { id: 3, lat: 37.7949, lng: -122.4094, strength: 0.82 }
      ]
    }
  },
  {
    id: '2',
    layerId: '2',
    timestamp: '2024-02-14T09:15:00Z',
    modelType: 'classification',
    confidence: 0.92,
    mineralType: 'cobalt',
    data: {
      anomalies: 1,
      hotspots: [
        { id: 1, lat: 37.7949, lng: -122.4094, strength: 0.92 }
      ]
    }
  }
];

interface ResultsVisualizationProps {
  className?: string;
}

const ResultsVisualization: React.FC<ResultsVisualizationProps> = ({ className }) => {
  const [results] = useState<AnalysisResult[]>(initialResults);

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

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="heatmap">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
            <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
            <TabsTrigger value="data">Raw Data</TabsTrigger>
          </TabsList>
          
          <TabsContent value="heatmap" className="mt-4">
            {results.length > 0 ? (
              <div className="space-y-4">
                <div className="aspect-video relative w-full rounded-lg overflow-hidden border">
                  <div className="absolute inset-0 grid-pattern"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-8 gradient-heatmap"></div>
                  
                  {/* Hotspots */}
                  <div className="absolute top-1/4 left-1/4 w-20 h-20 gradient-anomaly animate-pulse-slow"></div>
                  <div className="absolute bottom-1/3 right-1/3 w-24 h-24 gradient-anomaly animate-pulse-slow"></div>
                  <div className="absolute top-1/2 right-1/4 w-16 h-16 gradient-anomaly animate-pulse-slow"></div>
                  
                  {/* Legend */}
                  <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm p-1 rounded text-xs flex items-center">
                    <span className="font-medium mr-1">Prediction confidence:</span>
                    <span className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>Low
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mx-1"></span>Medium
                      <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mx-1"></span>High
                      <span className="inline-block w-2 h-2 rounded-full bg-red-500 ml-1"></span>Very High
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {results.map(result => (
                    <div key={result.id} className="analysis-card">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="mr-2 p-1.5 rounded-md bg-primary/10 text-primary">
                            {result.modelType === 'prediction' ? <TrendingUp size={16} /> : <Layers size={16} />}
                          </span>
                          <h3 className="font-medium">
                            {result.modelType === 'prediction' ? 'Predictive Analysis' : 'Classification Results'}
                          </h3>
                        </div>
                        <Badge className={getMineralColor(result.mineralType)}>
                          {result.mineralType}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {formatDate(result.timestamp)} • Confidence: {(result.confidence * 100).toFixed(1)}%
                      </p>
                      <div className="text-sm">
                        <p>Found {result.data.anomalies} anomalies</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Click to view detailed report
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center p-8 text-muted-foreground">
                <Database size={32} className="mx-auto mb-3" />
                <p>No analysis results available</p>
                <p className="text-sm mt-2">Run an analysis to see results here</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="anomalies" className="mt-4">
            {results.length > 0 ? (
              <div className="space-y-4">
                <h3 className="font-medium">Detected Anomalies</h3>
                <div className="grid grid-cols-2 gap-2">
                  {results.flatMap(result => 
                    result.data.hotspots.map(hotspot => (
                      <div key={`${result.id}-${hotspot.id}`} className="analysis-card">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">Hotspot #{hotspot.id}</h3>
                            <p className="text-xs text-muted-foreground">
                              Lat: {hotspot.lat.toFixed(4)}, Lng: {hotspot.lng.toFixed(4)}
                            </p>
                            <p className="text-xs">Strength: {(hotspot.strength * 100).toFixed(1)}%</p>
                          </div>
                          <Badge className={getMineralColor(result.mineralType)}>
                            {result.mineralType}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center p-8 text-muted-foreground">
                <Database size={32} className="mx-auto mb-3" />
                <p>No anomalies detected yet</p>
                <p className="text-sm mt-2">Run an analysis to detect anomalies</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="data" className="mt-4">
            <div className="text-center p-8 text-muted-foreground">
              <Database size={32} className="mx-auto mb-3" />
              <p>Raw data export available</p>
              <p className="text-sm mt-2">Use the export button to download results as CSV or GeoJSON</p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm">
          <div>
            <span className="font-medium">Latest Analysis:</span>
            <span className="text-muted-foreground ml-1">
              {results.length > 0 ? formatDate(results[0].timestamp) : 'N/A'}
            </span>
          </div>
          <div className="text-right">
            <span className="font-medium">Total Anomalies:</span>
            <span className="text-muted-foreground ml-1">
              {results.reduce((acc, result) => acc + result.data.anomalies, 0)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsVisualization;
