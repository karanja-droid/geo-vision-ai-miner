
import * as db from '@/lib/supabase/database';
import { ShapefileValidationResult } from '@/types';
import { useBaseDatabase } from './useBaseDatabase';

export const useFiles = () => {
  const { loading, setLoading, handleError, toast } = useBaseDatabase();

  const uploadDatasetFile = async (file: File, datasetId: string): Promise<string | null> => {
    try {
      setLoading(true);
      const filePath = await db.uploadDatasetFile(file, datasetId);
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
      return filePath;
    } catch (error) {
      return handleError(error, "Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  const processDatasetFile = async (
    file: File, 
    datasetId: string
  ): Promise<{filePath: string, validationResult?: ShapefileValidationResult} | null> => {
    try {
      setLoading(true);
      const result = await db.processDatasetFile(file, datasetId);
      
      if (result.validationResult) {
        const validText = result.validationResult.isValid ? "valid" : "invalid";
        toast({
          title: `File processed (${validText})`,
          description: `${file.name} has been processed and validated.`,
          variant: result.validationResult.isValid ? "default" : "destructive",
        });
      } else {
        toast({
          title: "File processed",
          description: `${file.name} has been processed successfully.`,
        });
      }
      
      return result;
    } catch (error) {
      return handleError(error, "Error processing file");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    uploadDatasetFile,
    processDatasetFile,
    getFilePublicUrl: db.getFilePublicUrl
  };
};
