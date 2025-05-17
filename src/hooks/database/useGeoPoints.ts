
import * as db from '@/lib/supabase/database';
import { GeoPoint } from '@/types';
import { useBaseDatabase } from './useBaseDatabase';

export const useGeoPoints = () => {
  const { loading, setLoading, handleError, toast } = useBaseDatabase();

  const createGeoPoint = async (point: Omit<GeoPoint, 'id'>, datasetId: string) => {
    try {
      setLoading(true);
      return await db.createGeoPoint(point, datasetId);
    } catch (error) {
      return handleError(error, "Error creating geo point");
    } finally {
      setLoading(false);
    }
  };

  const getGeoPointsByDataset = async (datasetId: string): Promise<GeoPoint[]> => {
    try {
      setLoading(true);
      return await db.getGeoPointsByDataset(datasetId);
    } catch (error) {
      handleError(error, "Error fetching geo points");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createGeoPoint,
    getGeoPointsByDataset
  };
};
