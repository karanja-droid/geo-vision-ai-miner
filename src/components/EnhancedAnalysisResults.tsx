
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database } from "lucide-react";
import { AnalysisResult } from '@/types';

// Import refactored components
import AnalysisSummary from './analysis/AnalysisSummary';
import AnalysisCharts from './analysis/AnalysisCharts';
import AnalysisDetails from './analysis/AnalysisDetails';
import AnalysisMap from './analysis/AnalysisMap';
import AnalysisDataView from './analysis/AnalysisDataView';

interface EnhancedAnalysisResultsProps {
  results: AnalysisResult[];
  className?: string;
}

export const EnhancedAnalysisResults: React.FC<EnhancedAnalysisResultsProps> = ({ 
  results, 
  className 
}) => {
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
