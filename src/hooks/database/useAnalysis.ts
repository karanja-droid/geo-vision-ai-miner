
import * as db from '@/lib/supabase/database';
import { AnalysisResult } from '@/types';
import { useBaseDatabase } from './useBaseDatabase';

export const useAnalysis = () => {
  const { loading, setLoading, handleError, toast } = useBaseDatabase();

  const createAnalysisResult = async (
    analysis: Omit<AnalysisResult, 'id' | 'timestamp'>,
    datasetId: string
  ) => {
    try {
      setLoading(true);
      const result = await db.createAnalysisResult(analysis, datasetId);
      toast({
        title: "Analysis completed",
        description: "The analysis has been completed successfully.",
      });
      return result;
    } catch (error) {
      return handleError(error, "Error creating analysis");
    } finally {
      setLoading(false);
    }
  };

  const getAnalysisResults = async (): Promise<AnalysisResult[]> => {
    try {
      setLoading(true);
      return await db.getAnalysisResults();
    } catch (error) {
      handleError(error, "Error fetching analysis results");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createAnalysisResult,
    getAnalysisResults
  };
};
