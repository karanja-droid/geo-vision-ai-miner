
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Loader2 } from "lucide-react";
import { AnalysisResult } from '@/types';
import { useAnalysis } from '@/hooks/database';

// Import refactored components
import AnalysisSummary from './analysis/AnalysisSummary';
import AnalysisCharts from './analysis/AnalysisCharts';
import AnalysisDetails from './analysis/AnalysisDetails';
import AnalysisMap from './analysis/AnalysisMap';
import AnalysisDataView from './analysis/AnalysisDataView';

// Mock data for fallback
const mockResults: AnalysisResult[] = [
  {
    id: 'mock-1',
    datasetId: 'dataset-001',
    layerId: 'layer-001',
    timestamp: new Date().toISOString(),
    modelType: 'prediction',
    confidence: 0.87,
    mineralType: 'copper',
    data: {
      anomalies: 3,
      hotspots: [
        { id: 1, lat: 37.7749, lng: -122.4194, strength: 0.9 },
        { id: 2, lat: 37.7848, lng: -122.4294, strength: 0.75 }
      ]
    }
  },
  {
    id: 'mock-2',
    datasetId: 'dataset-002',
    layerId: 'layer-002',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    modelType: 'classification',
    confidence: 0.92,
    mineralType: 'gold',
    data: {
      anomalies: 5,
      hotspots: [
        { id: 1, lat: 35.6895, lng: 139.6917, strength: 0.88 }
      ]
    }
  }
];

interface EnhancedAnalysisResultsProps {
  className?: string;
  results?: AnalysisResult[]; // Results as optional prop
}

export const EnhancedAnalysisResults: React.FC<EnhancedAnalysisResultsProps> = ({ 
  className,
  results: propResults 
}) => {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const { getAnalysisResults, loading } = useAnalysis();
  
  useEffect(() => {
    // If results are provided as props, use them
    if (propResults && propResults.length > 0) {
      setResults(propResults);
      return;
    }
    
    // Otherwise fetch from API
    const fetchAnalysisResults = async () => {
      try {
        const fetchedResults = await getAnalysisResults();
        if (fetchedResults && fetchedResults.length > 0) {
          setResults(fetchedResults);
        } else {
          // Use mock data if API returns empty results
          console.log("Using mock data as API returned no results");
          setResults(mockResults);
        }
      } catch (error) {
        console.error("Failed to fetch analysis results:", error);
        // Use mock data if API call fails
        console.log("Using mock data as API call failed");
        setResults(mockResults);
      }
    };
    
    fetchAnalysisResults();
  }, [getAnalysisResults, propResults]);
  
  // If still loading and no results, show loading indicator
  if (loading && results.length === 0) {
    return (
      <Card className={`h-full ${className}`}>
        <CardHeader>
          <CardTitle>Enhanced Analysis Results</CardTitle>
          <CardDescription>Comprehensive visualization of geological analysis data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="mt-2 text-sm text-muted-foreground">Loading analysis results...</span>
          </div>
        </CardContent>
      </Card>
    );
  }
  
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
          <TabsContent value="summary">
            {results.length > 0 ? (
              <AnalysisSummary results={results} />
            ) : (
              <div className="text-center p-8 text-muted-foreground">
                <Database size={32} className="mx-auto mb-3" />
                <p>No analysis results available</p>
                <p className="text-sm mt-2">Run an analysis to see results here</p>
              </div>
            )}
          </TabsContent>
          
          {/* Charts Tab */}
          <TabsContent value="charts">
            {results.length > 0 ? (
              <AnalysisCharts results={results} />
            ) : (
              <div className="text-center p-8 text-muted-foreground">
                <Database size={32} className="mx-auto mb-3" />
                <p>No analysis results available</p>
                <p className="text-sm mt-2">Run an analysis to see results here</p>
              </div>
            )}
          </TabsContent>
          
          {/* Detailed Results Tab */}
          <TabsContent value="details">
            {results.length > 0 ? (
              <AnalysisDetails results={results} />
            ) : (
              <div className="text-center p-8 text-muted-foreground">
                <Database size={32} className="mx-auto mb-3" />
                <p>No analysis results available</p>
                <p className="text-sm mt-2">Run an analysis to see results here</p>
              </div>
            )}
          </TabsContent>
          
          {/* Map Tab */}
          <TabsContent value="map">
            {results.length > 0 ? (
              <AnalysisMap results={results} />
            ) : (
              <div className="text-center p-8 text-muted-foreground">
                <Database size={32} className="mx-auto mb-3" />
                <p>No analysis results available</p>
                <p className="text-sm mt-2">Run an analysis to see results here</p>
              </div>
            )}
          </TabsContent>
          
          {/* Data Tab - Not shown in the tabs but likely accessed through ResultsVisualization.tsx */}
          <TabsContent value="data">
            {results.length > 0 ? (
              <AnalysisDataView results={results} />
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
              {results.length > 0 ? new Date(results[0].timestamp).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) : 'N/A'}
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

export default EnhancedAnalysisResults;
