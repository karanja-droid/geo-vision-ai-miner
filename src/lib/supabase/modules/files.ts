
import { supabase } from '@/lib/supabase';
import { ShapefileValidationResult } from '@/types';
import { saveShapefileValidation } from './analysis';
import { ShapefileProcessingService } from '@/services/ShapefileProcessingService';

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

// Enhanced function to handle file processing and validation
export const processDatasetFile = async (
  file: File,
  datasetId: string
): Promise<{filePath: string, validationResult?: ShapefileValidationResult}> => {
  try {
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    const isGeospatial = ['shp', 'geojson', 'kml', 'zip'].includes(fileExtension);
    
    // For geospatial files, use the ShapefileProcessingService
    if (isGeospatial) {
      const processingResult = await ShapefileProcessingService.processShapefile(file, datasetId);
      
      // Update the dataset with extracted metadata if available
      if (processingResult.metadata) {
        await supabase
          .from('datasets')
          .update({ 
            validated: processingResult.validationResult.isValid,
            // Store any additional metadata as needed
            metadata: processingResult.metadata
          })
          .eq('id', datasetId);
      }
      
      return {
        filePath: processingResult.filePath,
        validationResult: processingResult.validationResult
      };
    } 
    
    // For non-geospatial files, use the standard upload
    const filePath = await uploadDatasetFile(file, datasetId);
    
    return { filePath };
  } catch (error) {
    console.error('Error processing dataset file:', error);
    throw error;
  }
};
