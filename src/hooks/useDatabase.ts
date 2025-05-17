
import { useState } from 'react';
import * as db from '@/lib/supabase/database';
import { DatasetInfo, GeoPoint, AnalysisResult, ShapefileValidationResult } from '@/types';
import { useAuth } from '@/contexts/auth/useAuth';
import { useToast } from '@/hooks/use-toast';

export const useDatabase = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Datasets
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
      toast({
        title: "Error creating dataset",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getDatasets = async (): Promise<DatasetInfo[]> => {
    try {
      setLoading(true);
      return await db.getDatasets();
    } catch (error) {
      toast({
        title: "Error fetching datasets",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
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
      toast({
        title: "Error fetching dataset",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // File handling
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
      toast({
        title: "Error uploading file",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return null;
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
      toast({
        title: "Error processing file",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // GeoPoints
  const createGeoPoint = async (point: Omit<GeoPoint, 'id'>, datasetId: string) => {
    try {
      setLoading(true);
      return await db.createGeoPoint(point, datasetId);
    } catch (error) {
      toast({
        title: "Error creating geo point",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getGeoPointsByDataset = async (datasetId: string): Promise<GeoPoint[]> => {
    try {
      setLoading(true);
      return await db.getGeoPointsByDataset(datasetId);
    } catch (error) {
      toast({
        title: "Error fetching geo points",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Analysis results
  const createAnalysisResult = async (
    analysis: Omit<AnalysisResult, 'id' | 'timestamp'>,
    datasetId: string
  ) => {
    try {
      setLoading(true);
      const result = await db.createAnalysisResult(analysis, datasetId);
      toast({
        title: "Analysis completed",
        description: "The analysis has been completed successfully.",
      });
      return result;
    } catch (error) {
      toast({
        title: "Error creating analysis",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getAnalysisResults = async (): Promise<AnalysisResult[]> => {
    try {
      setLoading(true);
      return await db.getAnalysisResults();
    } catch (error) {
      toast({
        title: "Error fetching analysis results",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Organizations
  const createOrganization = async (name: string, type: string, description?: string) => {
    try {
      setLoading(true);
      const org = await db.createOrganization(name, type, description);
      toast({
        title: "Organization created",
        description: `${name} has been created successfully.`,
      });
      return org;
    } catch (error) {
      toast({
        title: "Error creating organization",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getOrganizations = async () => {
    try {
      setLoading(true);
      return await db.getOrganizations();
    } catch (error) {
      toast({
        title: "Error fetching organizations",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const updateUserOrganization = async (organizationId: string) => {
    if (!user?.id) {
      toast({
        title: "Error updating organization",
        description: "You must be logged in to update your organization.",
        variant: "destructive",
      });
      return null;
    }
    
    try {
      setLoading(true);
      const result = await db.updateUserOrganization(user.id, organizationId);
      toast({
        title: "Organization updated",
        description: "Your organization has been updated successfully.",
      });
      return result;
    } catch (error) {
      toast({
        title: "Error updating organization",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    // Dataset functions
    createDataset,
    getDatasets,
    getDatasetById,
    // File functions
    uploadDatasetFile,
    processDatasetFile,
    getFilePublicUrl: db.getFilePublicUrl,
    // GeoPoint functions
    createGeoPoint,
    getGeoPointsByDataset,
    // Analysis functions
    createAnalysisResult,
    getAnalysisResults,
    // Organization functions
    createOrganization,
    getOrganizations,
    updateUserOrganization,
  };
};
