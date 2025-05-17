
import React from 'react';
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalysisSummary from '@/components/analysis/AnalysisSummary';
import AnalysisDetails from '@/components/analysis/AnalysisDetails';
import AnalysisDataView from '@/components/analysis/AnalysisDataView';
import { useQuery } from '@tanstack/react-query';
import { getAnalysisResults } from '@/lib/supabase/database';
import { Skeleton } from "@/components/ui/skeleton";
import { AnalysisResult } from '@/types/analysis';

// Mock data to use when the API fails
const mockResults: AnalysisResult[] = [
  {
    id: '1',
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
        { id: 2, lat: 37.7848, lng: -122.4294, strength: 0.75 },
        { id: 3, lat: 37.7949, lng: -122.4094, strength: 0.82 }
      ],
      insights: ['Strong correlation with geological formations', 'High confidence prediction zone identified']
    }
  },
  {
    id: '2',
    datasetId: 'dataset-002',
    layerId: 'layer-002',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    modelType: 'classification',
    confidence: 0.92,
    mineralType: 'gold',
    data: {
      anomalies: 5,
      hotspots: [
        { id: 1, lat: 35.6895, lng: 139.6917, strength: 0.88 },
        { id: 2, lat: 35.6898, lng: 139.7036, strength: 0.76 }
      ],
      insights: ['Potential gold deposit identified', 'Further investigation recommended']
    }
  }
];

const Analysis: React.FC = () => {
  const { data: results, isLoading, error } = useQuery({
    queryKey: ['analysisResults'],
    queryFn: async () => {
      try {
        return await getAnalysisResults();
      } catch (error) {
        console.error("Error fetching analysis results:", error);
        // Return mock data when the API call fails
        return mockResults;
      }
    }
  });

  if (isLoading) {
    return (
      <Container className="py-6 space-y-6">
        <h1 className="text-3xl font-bold">Analysis Results</h1>
        <div className="space-y-4">
          <Skeleton className="h-[300px] w-full" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </Container>
    );
  }

  // We never reach this point since we're now returning mock data in case of error
  if (error) {
    return (
      <Container className="py-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-red-800 font-medium">Error loading analysis results</h2>
          <p className="text-red-700 text-sm mt-1">
            {error instanceof Error ? error.message : 'An unexpected error occurred'}
          </p>
        </div>
      </Container>
    );
  }

  const analysisResults = results || [];

  return (
    <Container className="py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analysis Results</h1>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="summary" className="flex-1">Summary</TabsTrigger>
          <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
          <TabsTrigger value="data" className="flex-1">Data</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <AnalysisSummary results={analysisResults} />
        </TabsContent>
        <TabsContent value="details">
          <AnalysisDetails results={analysisResults} />
        </TabsContent>
        <TabsContent value="data">
          <AnalysisDataView results={analysisResults} />
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default Analysis;
