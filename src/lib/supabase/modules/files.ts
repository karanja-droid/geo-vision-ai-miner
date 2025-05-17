
import { supabase } from '@/lib/supabase';
import { ShapefileValidationResult } from '@/types';
import { saveShapefileValidation } from './analysis';

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
