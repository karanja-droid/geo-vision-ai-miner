
import * as db from '@/lib/supabase/database';
import { DatasetInfo } from '@/types';
import { useBaseDatabase } from './useBaseDatabase';

export const useDatasets = () => {
  const { loading, setLoading, handleError, toast } = useBaseDatabase();

  const createDataset = async (dataset: Omit<DatasetInfo, 'id' | 'uploadDate'>) => {
    try {
      setLoading(true);
      const createdDataset = await db.createDataset(dataset);
      toast({
        title: "Dataset created",
        description: `${dataset.name} has been created successfully.`,
      });
      return createdDataset;
    } catch (error) {
      return handleError(error, "Error creating dataset");
    } finally {
      setLoading(false);
    }
  };

  const getDatasets = async (): Promise<DatasetInfo[]> => {
    try {
      setLoading(true);
      return await db.getDatasets();
    } catch (error) {
      handleError(error, "Error fetching datasets");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getDatasetById = async (id: string): Promise<DatasetInfo | null> => {
    try {
      setLoading(true);
      return await db.getDatasetById(id);
    } catch (error) {
      handleError(error, "Error fetching dataset");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createDataset,
    getDatasets,
    getDatasetById
  };
};
