
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, Activity, Clock, Users, Layers, Bug, Info } from "lucide-react";
import { ErrorDetails, PerformanceMetrics } from '@/types/monitoring';

// Sample data - in production this would come from your monitoring system
const sampleErrors: ErrorDetails[] = [
  {
    message: "Failed to load dataset details",
    type: "error",
    details: { datasetId: "ds-123", component: "DatasetLibrary" },
    timestamp: "2025-05-16T14:32:21Z",
    source: "api",
    userName: "geologist.user"
  },
  {
    message: "Map rendering error on zoom level 12",
    type: "warning",
    details: { zoomLevel: 12, layerId: "mineral-deposits" },
    timestamp: "2025-05-16T13:15:42Z",
    source: "map-component",
    userName: "admin.user" 
  },
  {
    message: "Timeout when processing shapefile",
    type: "error",
    details: { fileSize: "15MB", duration: "45s" },
    timestamp: "2025-05-15T09:22:10Z",
    source: "shapefile-processor",
    userName: "field.user"
  }
];

const samplePerformanceData = [
  { path: '/dashboard', pageLoadTime: 1200, apiLatency: 250, resourceLoadTime: 850, timestamp: "2025-05-17T10:00:00Z" },
  { path: '/dataset-library', pageLoadTime: 1800, apiLatency: 450, resourceLoadTime: 1200, timestamp: "2025-05-17T11:00:00Z" },
  { path: '/analysis', pageLoadTime: 2200, apiLatency: 600, resourceLoadTime: 1500, timestamp: "2025-05-17T12:00:00Z" },
  { path: '/map', pageLoadTime: 2800, apiLatency: 350, resourceLoadTime: 2300, timestamp: "2025-05-17T13:00:00Z" },
  { path: '/shapefile-processor', pageLoadTime: 1500, apiLatency: 300, resourceLoadTime: 1100, timestamp: "2025-05-17T14:00:00Z" },
];

const userActivityData = [
  { user: 'geologists', logins: 28, datasetViews: 145, analysisRuns: 12 },
  { user: 'drill-team', logins: 15, datasetViews: 53, analysisRuns: 3 },
  { user: 'government', logins: 8, datasetViews: 64, analysisRuns: 0 },
  { user: 'investors', logins: 12, datasetViews: 38, analysisRuns: 5 },
];

export const BetaMonitoringDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('errors');
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    // In a real implementation, you would fetch this data from your backend
    switch (activeTab) {
      case 'performance':
        setChartData(samplePerformanceData.map(item => ({
          name: item.path.replace('/', ''),
          'Page Load': item.pageLoadTime,
          'API Latency': item.apiLatency,
          'Resource Load': item.resourceLoadTime,
        })));
        break;
      case 'usage':
        setChartData(userActivityData);
        break;
      default:
        setChartData([]);
    }
  }, [activeTab]);

  const getErrorBadgeVariant = (type: string) => {
    return type === 'error' ? 'destructive' : 'warning';
  };

  const formatTimestamp = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Beta Monitoring Dashboard
            </CardTitle>
            <CardDescription>
              Track system performance and issues during the beta testing phase
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            Beta Period
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="errors" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="errors" className="flex items-center gap-1">
              <Bug className="h-4 w-4" />
              <span>Errors & Warnings</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Performance</span>
            </TabsTrigger>
            <TabsTrigger value="usage" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>User Activity</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="errors" className="space-y-4 pt-4">
            <Alert variant="default" className="bg-primary/5">
              <Info className="h-4 w-4" />
              <AlertTitle>Beta Testing Insights</AlertTitle>
              <AlertDescription>
                All errors and warnings are automatically collected from beta users to help identify issues.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-3 mt-4">
              {sampleErrors.map((error, index) => (
                <div key={index} className="p-3 border rounded-md">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className={`h-4 w-4 ${error.type === 'error' ? 'text-destructive' : 'text-amber-500'}`} />
                      <span className="font-medium">{error.message}</span>
                    </div>
                    <Badge variant={getErrorBadgeVariant(error.type)}>
                      {error.type}
                    </Badge>
                  </div>
                  
                  <div className="mt-2 text-sm text-muted-foreground">
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{error.userName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Layers className="h-3 w-3" />
                        <span>{error.source}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimestamp(error.timestamp)}</span>
                      </div>
                    </div>
                    
                    {error.details && (
                      <div className="mt-1 font-mono text-xs bg-muted p-2 rounded">
                        {JSON.stringify(error.details)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                  <YAxis label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => `${value} ms`} />
                  <Bar dataKey="Page Load" fill="#8884d8" />
                  <Bar dataKey="API Latency" fill="#82ca9d" />
                  <Bar dataKey="Resource Load" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm">Avg Page Load</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-2xl font-bold">
                    {Math.round(samplePerformanceData.reduce((sum, item) => sum + item.pageLoadTime, 0) / samplePerformanceData.length)} ms
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm">Avg API Latency</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-2xl font-bold">
                    {Math.round(samplePerformanceData.reduce((sum, item) => sum + item.apiLatency, 0) / samplePerformanceData.length)} ms
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm">Slowest Page</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-xl font-bold">
                    {samplePerformanceData.sort((a, b) => b.pageLoadTime - a.pageLoadTime)[0].path}
                  </span>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="usage" className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="user" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="logins" fill="#8884d8" name="Logins" />
                  <Bar dataKey="datasetViews" fill="#82ca9d" name="Dataset Views" />
                  <Bar dataKey="analysisRuns" fill="#ffc658" name="Analysis Runs" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>User Activity Insights</AlertTitle>
                <AlertDescription>
                  Geologists are the most active user group during the beta, with investors showing strong interest in analysis results.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
