
import * as db from '@/lib/supabase/database';
import { AnalysisResult, AnalysisOptions } from '@/types/analysis';
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
      return handleError(error, "Error creating analysis", "medium", {
        action: "createAnalysisResult",
        datasetId
      });
    } finally {
      setLoading(false);
    }
  };

  const getAnalysisResults = async (): Promise<AnalysisResult[]> => {
    try {
      setLoading(true);
      return await db.getAnalysisResults();
    } catch (error) {
      handleError(error, "Error fetching analysis results", "medium", {
        action: "getAnalysisResults"
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const runModelAnalysis = async (
    datasetId: string,
    modelId: string, 
    options: AnalysisOptions
  ): Promise<AnalysisResult | null> => {
    try {
      setLoading(true);
      const result = await db.runModelAnalysis(datasetId, modelId, options);
      toast({
        title: "Analysis completed",
        description: `The ${options.deepLearning ? 'deep learning' : 'standard'} analysis has been completed successfully.`,
      });
      return result;
    } catch (error) {
      return handleError(error, "Error running model analysis", "high", {
        action: "runModelAnalysis",
        datasetId,
        modelId
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createAnalysisResult,
    getAnalysisResults,
    runModelAnalysis
  };
};
