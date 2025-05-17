
import { supabase } from '@/lib/supabase';
import { ShapefileValidationResult } from '@/types';
import * as validation from '@/utils/gis/validation';

/**
 * Service for handling shapefile processing operations
 */
export class ShapefileProcessingService {
  /**
   * Validates a shapefile and returns validation results
   * @param file The file to validate
   */
  public static async validateShapefile(file: File): Promise<ShapefileValidationResult> {
    // For now, we'll use client-side validation
    // In a production app, this would be handled by a backend service
    console.log('Validating file:', file.name);
    
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!fileExtension) {
      return {
        isValid: false,
        errors: ['Unable to determine file extension'],
        warnings: []
      };
    }
    
    // Check if this is a supported file type
    if (!['shp', 'geojson', 'kml', 'zip'].includes(fileExtension)) {
      return {
        isValid: false,
        errors: [`Unsupported file extension: ${fileExtension}`],
        warnings: []
      };
    }

    // If it's a zip file, check if it contains required shapefile components
    if (fileExtension === 'zip') {
      // In a real implementation, we would unzip and check contents
      // For now, we'll assume zip files are valid shapefile collections
      return {
        isValid: true,
        errors: [],
        warnings: ['Zip validation is limited in browser environment'],
        features: 0, // Unknown until fully processed
        crs: 'Unknown' // Unknown until fully processed
      };
    }

    // For shapefiles, we should check for companion files (.dbf, .shx, .prj)
    // but in a single file upload context this is challenging
    if (fileExtension === 'shp') {
      return {
        isValid: true,
        errors: [],
        warnings: ['Individual .shp file uploaded. Associated .dbf, .shx, and .prj files are required for complete functionality.'],
        features: 0,
        crs: 'Unknown'
      };
    }

    // GeoJSON validation
    if (fileExtension === 'geojson') {
      try {
        // In a real implementation, we would load and validate the GeoJSON
        // For now, we'll just do a basic check on file size
        const maxSize = 10 * 1024 * 1024; // 10MB
        
        if (file.size > maxSize) {
          return {
            isValid: true,
            errors: [],
            warnings: ['Large GeoJSON file may cause performance issues'],
            features: 0,
            crs: 'EPSG:4326' // GeoJSON typically uses WGS 84
          };
        }
        
        return {
          isValid: true,
          errors: [],
          warnings: [],
          features: 0, // Unknown until processed
          crs: 'EPSG:4326'
        };
      } catch (error) {
        return {
          isValid: false,
          errors: ['Invalid GeoJSON format'],
          warnings: []
        };
      }
    }
    
    // KML validation
    if (fileExtension === 'kml') {
      return {
        isValid: true,
        errors: [],
        warnings: [],
        features: 0, // Unknown until processed
        crs: 'EPSG:4326' // KML uses WGS 84
      };
    }

    // Default case
    return {
      isValid: true,
      errors: [],
      warnings: ['Limited validation performed for this file type'],
      features: 0,
      crs: 'Unknown'
    };
  }
  
  /**
   * Processes a shapefile and extracts metadata
   * @param file The file to process
   * @param datasetId The dataset ID to associate with
   */
  public static async processShapefile(
    file: File, 
    datasetId: string
  ): Promise<{
    filePath: string;
    validationResult: ShapefileValidationResult;
    metadata: Record<string, any>;
  }> {
    try {
      // First upload the file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${datasetId}-${Date.now()}.${fileExt}`;
      const filePath = `datasets/${datasetId}/${fileName}`;
      
      const { data, error } = await supabase.storage
        .from('geological-data')
        .upload(filePath, file);
      
      if (error) {
        throw error;
      }
      
      // Validate the shapefile
      const validationResult = await this.validateShapefile(file);
      
      // Extract basic metadata for demonstration
      const metadata = {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        uploadDate: new Date().toISOString(),
        format: fileExt?.toUpperCase() || 'UNKNOWN'
      };
      
      // Store reference in dataset_files table
      const { error: dbError } = await supabase
        .from('dataset_files')
        .insert({
          dataset_id: datasetId,
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          storage_path: data?.path || filePath
        });
      
      if (dbError) {
        throw dbError;
      }
      
      // Store validation result
      await supabase.from('shapefile_validation_results').insert({
        file_id: filePath, // Using the filePath as a reference
        is_valid: validationResult.isValid,
        errors: validationResult.errors || [],
        warnings: validationResult.warnings || [],
        features: validationResult.features || 0,
        crs: validationResult.crs || 'Unknown'
      });
      
      return {
        filePath,
        validationResult,
        metadata
      };
    } catch (error) {
      console.error('Error processing shapefile:', error);
      throw error;
    }
  }
}
