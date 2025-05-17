import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Layers, Database, Download, Settings2 } from "lucide-react";
import { AnalysisResult } from '@/types';
import { VisualizationOptions, VisualizationSettings } from './VisualizationOptions';
import { ExportOptions } from './ExportOptions';
import { EnhancedAnalysisResults } from './EnhancedAnalysisResults';

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
  const [visualizationSettings, setVisualizationSettings] = useState<VisualizationSettings | null>(null);
  const [activeTab, setActiveTab] = useState<string>("heatmap");
  const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);

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
  
  const handleExportData = (format: string, options: any) => {
    // Implementation would go here - for now we'll just log the options
    console.log(`Exporting data in ${format} format with options:`, options);
  };
  
  const handleVisSettingsApply = (settings: VisualizationSettings) => {
    setVisualizationSettings(settings);
    console.log('Applied visualization settings:', settings);
    // In a real app, this would update the visualization
  };
  
  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };
  
  return (
    <Card className={`h-full ${className}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Analysis Results</CardTitle>
          <Button variant="outline" size="sm" onClick={toggleAdvancedOptions}>
            <Settings2 className="h-4 w-4 mr-2" />
            {showAdvancedOptions ? "Hide Options" : "Show Advanced Options"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {showAdvancedOptions && (
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <VisualizationOptions onApply={handleVisSettingsApply} />
            <ExportOptions results={results} onExport={handleExportData} />
          </div>
        )}
        
        <Tabs defaultValue="heatmap" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
            <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
            <TabsTrigger value="enhanced">Enhanced View</TabsTrigger>
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
                  
                  {visualizationSettings && (
                    <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1 rounded text-xs">
                      <div>Mode: {visualizationSettings.renderMode}</div>
                      <div>Scheme: {visualizationSettings.colorScheme}</div>
                      {visualizationSettings.visualization3D && (
                        <div>3D View Active</div>
                      )}
                    </div>
                  )}
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
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Filter Anomalies
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export Anomalies
                  </Button>
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
          
          <TabsContent value="enhanced" className="mt-4">
            <EnhancedAnalysisResults results={results} />
          </TabsContent>
          
          <TabsContent value="data" className="mt-4">
            {results.length > 0 ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Raw Analysis Data</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export GeoJSON
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">ID</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Layer</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Type</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Mineral</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Confidence</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Timestamp</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Anomalies</th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-muted/20">
                      {results.map((result) => (
                        <tr key={result.id}>
                          <td className="px-4 py-2 text-sm">{result.id}</td>
                          <td className="px-4 py-2 text-sm">{result.layerId}</td>
                          <td className="px-4 py-2 text-sm">{result.modelType}</td>
                          <td className="px-4 py-2 text-sm">
                            <Badge className={getMineralColor(result.mineralType)}>
                              {result.mineralType}
                            </Badge>
                          </td>
                          <td className="px-4 py-2 text-sm">{(result.confidence * 100).toFixed(1)}%</td>
                          <td className="px-4 py-2 text-sm">{formatDate(result.timestamp)}</td>
                          <td className="px-4 py-2 text-sm">{result.data.anomalies}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Raw JSON Data</h3>
                  <div className="bg-muted p-4 rounded-lg overflow-auto max-h-[300px]">
                    <pre className="text-xs">{JSON.stringify(results, null, 2)}</pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-8 text-muted-foreground">
                <Database size={32} className="mx-auto mb-3" />
                <p>Raw data export available</p>
                <p className="text-sm mt-2">Use the export button to download results as CSV or GeoJSON</p>
              </div>
            )}
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
