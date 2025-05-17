
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

const Analysis: React.FC = () => {
  const { data: results, isLoading, error } = useQuery({
    queryKey: ['analysisResults'],
    queryFn: getAnalysisResults
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

  const analysisResults = results || [] as AnalysisResult[];

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
