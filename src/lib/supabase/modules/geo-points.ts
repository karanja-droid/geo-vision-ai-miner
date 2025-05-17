
import { supabase } from '@/lib/supabase';
import { GeoPoint } from '@/types';

// GeoPoint management
export const createGeoPoint = async (point: Omit<GeoPoint, 'id'>, datasetId: string) => {
  const { data, error } = await supabase.from('geo_points').insert({
    latitude: point.latitude,
    longitude: point.longitude,
    elevation: point.elevation,
    properties: point.properties,
    dataset_id: datasetId
  }).select().single();
  
  if (error) {
    console.error('Error creating geo point:', error);
    throw error;
  }
  
  return data;
};

export const getGeoPointsByDataset = async (datasetId: string): Promise<GeoPoint[]> => {
  const { data, error } = await supabase
    .from('geo_points')
    .select('*')
    .eq('dataset_id', datasetId);
  
  if (error) {
    console.error(`Error fetching geo points for dataset ${datasetId}:`, error);
    throw error;
  }
  
  return data.map(item => ({
    id: item.id,
    latitude: item.latitude,
    longitude: item.longitude,
    elevation: item.elevation,
    properties: item.properties
  }));
};
