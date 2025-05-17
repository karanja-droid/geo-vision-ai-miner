
import { supabase } from '@/lib/supabase';
import { DatasetInfo } from '@/types';

// Dataset management
export const createDataset = async (dataset: Omit<DatasetInfo, 'id' | 'uploadDate'>) => {
  const { data, error } = await supabase.from('datasets').insert({
    name: dataset.name,
    type: dataset.type,
    size: dataset.size,
    description: dataset.description,
    source: dataset.source,
    organization: dataset.organization,
    validated: dataset.validated || false,
    owner_id: supabase.auth.getUser().then(res => res.data.user?.id)
  }).select().single();
  
  if (error) {
    console.error('Error creating dataset:', error);
    throw error;
  }
  
  return data;
};

export const getDatasets = async (): Promise<DatasetInfo[]> => {
  const { data, error } = await supabase
    .from('datasets')
    .select('*')
    .order('upload_date', { ascending: false });
  
  if (error) {
    console.error('Error fetching datasets:', error);
    throw error;
  }
  
  return data.map(item => ({
    id: item.id,
    name: item.name,
    type: item.type,
    size: item.size,
    uploadDate: item.upload_date,
    description: item.description,
    source: item.source,
    organization: item.organization,
    validated: item.validated
  }));
};

export const getDatasetById = async (id: string): Promise<DatasetInfo | null> => {
  const { data, error } = await supabase
    .from('datasets')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching dataset with id ${id}:`, error);
    return null;
  }
  
  return {
    id: data.id,
    name: data.name,
    type: data.type,
    size: data.size,
    uploadDate: data.upload_date,
    description: data.description,
    source: data.source,
    organization: data.organization,
    validated: data.validated
  };
};
