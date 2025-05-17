
import { supabase } from '@/lib/supabase';
import { DatasetInfo, GeoPoint, AnalysisResult, ShapefileValidationResult } from '@/types';
import { AuthUser } from '@/types/auth';

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

// Analysis results management
export const createAnalysisResult = async (
  analysis: Omit<AnalysisResult, 'id' | 'timestamp'>,
  datasetId: string
) => {
  const { data, error } = await supabase.from('analysis_results').insert({
    name: analysis.name || 'Analysis Result',
    description: analysis.description || '',
    type: analysis.modelType,
    features: analysis.data,
    confidence: analysis.confidence,
    dataset_id: datasetId,
    owner_id: supabase.auth.getUser().then(res => res.data.user?.id)
  }).select().single();
  
  if (error) {
    console.error('Error creating analysis result:', error);
    throw error;
  }
  
  return data;
};

export const getAnalysisResults = async (): Promise<AnalysisResult[]> => {
  const { data, error } = await supabase
    .from('analysis_results')
    .select('*')
    .order('timestamp', { ascending: false });
  
  if (error) {
    console.error('Error fetching analysis results:', error);
    throw error;
  }
  
  return data.map(item => ({
    id: item.id,
    layerId: item.dataset_id,
    timestamp: item.timestamp,
    modelType: item.type,
    confidence: item.confidence,
    data: item.features,
    mineralType: item.mineral_type || 'unknown'
  }));
};

// Shapefile validation
export const saveShapefileValidation = async (
  validationResult: ShapefileValidationResult,
  fileId: string
) => {
  const { data, error } = await supabase.from('shapefile_validation_results').insert({
    file_id: fileId,
    is_valid: validationResult.isValid,
    errors: validationResult.errors,
    warnings: validationResult.warnings,
    features: validationResult.features,
    crs: validationResult.crs
  }).select().single();
  
  if (error) {
    console.error('Error saving shapefile validation:', error);
    throw error;
  }
  
  return data;
};

// User profile management - extending the existing getUserProfile function
export const updateUserOrganization = async (
  userId: string, 
  organizationId: string
) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ organization_id: organizationId })
    .eq('id', userId);
    
  if (error) {
    console.error('Error updating user organization:', error);
    throw error;
  }
  
  return data;
};

// Organizations management
export const createOrganization = async (
  name: string,
  type: string,
  description?: string
) => {
  const { data, error } = await supabase.from('organizations').insert({
    name,
    type,
    description
  }).select().single();
  
  if (error) {
    console.error('Error creating organization:', error);
    throw error;
  }
  
  return data;
};

export const getOrganizations = async () => {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .order('name', { ascending: true });
  
  if (error) {
    console.error('Error fetching organizations:', error);
    throw error;
  }
  
  return data;
};

// File upload to Supabase storage
export const uploadDatasetFile = async (
  file: File,
  datasetId: string
): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${datasetId}-${Date.now()}.${fileExt}`;
  const filePath = `datasets/${datasetId}/${fileName}`;
  
  const { data, error } = await supabase.storage
    .from('geological-data')
    .upload(filePath, file);
  
  if (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
  
  // Store reference in dataset_files table
  const { error: dbError } = await supabase
    .from('dataset_files')
    .insert({
      dataset_id: datasetId,
      file_name: file.name,
      file_path: filePath,
      file_type: file.type,
      file_size: file.size,
      storage_path: data.path
    });
  
  if (dbError) {
    console.error('Error storing file reference:', dbError);
    throw dbError;
  }
  
  return filePath;
};

// Get public URL for a stored file
export const getFilePublicUrl = (filePath: string): string => {
  const { data } = supabase.storage
    .from('geological-data')
    .getPublicUrl(filePath);
    
  return data.publicUrl;
};

// Create function to handle file processing and potential validation
export const processDatasetFile = async (
  file: File,
  datasetId: string
): Promise<{filePath: string, validationResult?: ShapefileValidationResult}> => {
  // Upload file first
  const filePath = await uploadDatasetFile(file, datasetId);
  
  // If shapefile, try to validate
  if (file.name.endsWith('.shp') || file.name.endsWith('.geojson')) {
    // This would be handled by a separate function, possibly via edge function
    // For now, we return a mock validation
    const mockValidation: ShapefileValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      features: 10,
      crs: 'EPSG:4326'
    };
    
    await saveShapefileValidation(mockValidation, filePath);
    
    return { filePath, validationResult: mockValidation };
  }
  
  return { filePath };
};
