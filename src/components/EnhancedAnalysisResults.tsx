
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, Area, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { FileSpreadsheet, ChartPie, ChartBar, Download } from "lucide-react";
import { AnalysisResult } from '@/types';

interface EnhancedAnalysisResultsProps {
  results: AnalysisResult[];
  className?: string;
}

export const EnhancedAnalysisResults: React.FC<EnhancedAnalysisResultsProps> = ({ 
  results, 
  className 
}) => {
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

  // Chart data preparation
  const mineralDistribution = results.reduce((acc, result) => {
    const mineral = result.mineralType || 'unknown';
    const existingItem = acc.find(item => item.name === mineral);
    if (existingItem) {
      existingItem.value += 1;
    } else {
      acc.push({ name: mineral, value: 1 });
    }
    return acc;
  }, [] as { name: string, value: number }[]);

  const confidenceData = results.map(result => ({
    name: result.id,
    confidence: parseFloat((result.confidence * 100).toFixed(1)),
    mineral: result.mineralType,
    timestamp: new Date(result.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric' })
  }));

  const anomaliesOverTime = results.map(result => ({
    date: new Date(result.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric' }),
    anomalies: result.data.anomalies,
    mineral: result.mineralType
  }));

  // Color configuration for charts
  const COLORS = ['#d32f2f', '#5c6bc0', '#ffc107', '#795548', '#607d8b'];
  const mineralToColor: Record<string, string> = {
    copper: '#d32f2f',
    cobalt: '#5c6bc0',
    gold: '#ffc107',
    iron: '#795548',
    zinc: '#607d8b'
  };

  // Prepare summary statistics
  const totalAnomalies = results.reduce((acc, result) => acc + result.data.anomalies, 0);
  const avgConfidence = results.length > 0 
    ? parseFloat((results.reduce((acc, result) => acc + result.confidence, 0) / results.length * 100).toFixed(1)) 
    : 0;
  const hotspotCount = results.reduce((acc, result) => acc + (result.data.hotspots?.length || 0), 0);
  const mostRecentDate = results.length > 0 
    ? formatDate(results.reduce((latest, result) => 
        new Date(result.timestamp) > new Date(latest) ? result.timestamp : latest, 
        results[0].timestamp)) 
    : 'N/A';

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader>
        <CardTitle>Enhanced Analysis Results</CardTitle>
        <CardDescription>Comprehensive visualization of geological analysis data</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="details">Detailed Results</TabsTrigger>
            <TabsTrigger value="map">Spatial Analysis</TabsTrigger>
          </TabsList>
          
          {/* Summary Tab */}
          <TabsContent value="summary" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{totalAnomalies}</div>
                    <p className="text-sm text-muted-foreground">Total Anomalies</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{avgConfidence}%</div>
                    <p className="text-sm text-muted-foreground">Avg. Confidence</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{hotspotCount}</div>
                    <p className="text-sm text-muted-foreground">Hotspots</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{results.length}</div>
                    <p className="text-sm text-muted-foreground">Analyses</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ChartPie className="h-5 w-5 mr-2" />
                  Mineral Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mineralDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {mineralDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={mineralToColor[entry.name] || COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background p-2 border rounded shadow-sm">
                              <p className="font-medium">{payload[0].name}</p>
                              <p className="text-sm">{`Count: ${payload[0].value}`}</p>
                              <p className="text-sm">{`Percentage: ${((payload[0].value / results.length) * 100).toFixed(1)}%`}</p>
                            </div>
                          );
                        }
                        return null;
                      }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Additional summary info */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Most Recent Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Date:</span>
                      <span className="ml-2">{mostRecentDate}</span>
                    </div>
                    {results.length > 0 && (
                      <>
                        <div>
                          <span className="text-sm text-muted-foreground">Model Type:</span>
                          <span className="ml-2">{results[0].modelType}</span>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Mineral:</span>
                          <Badge className={`ml-2 ${getMineralColor(results[0].mineralType)}`}>
                            {results[0].mineralType}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Confidence:</span>
                          <span className="ml-2">{(results[0].confidence * 100).toFixed(1)}%</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Analysis Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Prediction Models:</span>
                      <Badge variant="outline">
                        {results.filter(r => r.modelType === 'prediction').length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Classification Models:</span>
                      <Badge variant="outline">
                        {results.filter(r => r.modelType === 'classification').length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">High Confidence (>80%):</span>
                      <Badge variant="outline">
                        {results.filter(r => r.confidence > 0.8).length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Layers Analyzed:</span>
                      <Badge variant="outline">
                        {new Set(results.map(r => r.layerId)).size}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Summary Report
              </Button>
            </div>
          </TabsContent>
          
          {/* Charts Tab */}
          <TabsContent value="charts" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ChartBar className="h-5 w-5 mr-2" />
                  Confidence Levels by Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer 
                    config={{
                      copper: { color: '#d32f2f' },
                      cobalt: { color: '#5c6bc0' },
                      gold: { color: '#ffc107' },
                      iron: { color: '#795548' },
                      zinc: { color: '#607d8b' },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={confidenceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" />
                        <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                        <RechartsTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="confidence" name="Confidence %" fill="var(--color-copper)" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileSpreadsheet className="h-5 w-5 mr-2" />
                  Anomalies Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer 
                    config={{
                      anomalies: { color: '#ff9800' },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={anomaliesOverTime}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <RechartsTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="anomalies" 
                          fill="var(--color-anomalies)" 
                          stroke="var(--color-anomalies)" 
                          fillOpacity={0.3} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Charts
              </Button>
              <Button size="sm">
                View More Analytics
              </Button>
            </div>
          </TabsContent>
          
          {/* Detailed Results Tab */}
          <TabsContent value="details" className="mt-4 space-y-4">
            <div className="space-y-4">
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
                              <span>{(result.confidence * 100).toFixed(1)}%</span>
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
          </TabsContent>
          
          {/* Map Tab */}
          <TabsContent value="map" className="mt-4">
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
                      <Button>Open Interactive Map</Button>
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnhancedAnalysisResults;
