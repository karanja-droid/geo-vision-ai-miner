
import { supabase } from '@/lib/supabase';
import { AnalysisResult, ShapefileValidationResult } from '@/types';

// Analysis results management
export const createAnalysisResult = async (
  analysis: Omit<AnalysisResult, 'id' | 'timestamp'>,
  datasetId: string
) => {
  const { data, error } = await supabase.from('analysis_results').insert({
    name: `Analysis: ${analysis.modelType || 'Default'}`,  // Default name
    description: `Analysis result for dataset ${datasetId}`, // Default description
    type: analysis.modelType || 'default',
    features: analysis.data,
    confidence: analysis.confidence,
    dataset_id: datasetId,
    mineral_type: analysis.mineralType || 'unknown',
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
    datasetId: item.dataset_id,
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
