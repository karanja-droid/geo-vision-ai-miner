
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StakeholderOrganization } from '@/types';
import { ShapefileValidationResult } from '@/types';

interface UploaderContextType {
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  source: string;
  setSource: (value: string) => void;
  organization: StakeholderOrganization | '';
  setOrganization: (value: StakeholderOrganization | '') => void;
  file: File | null;
  setFile: (value: File | null) => void;
  uploadProgress: number;
  setUploadProgress: (value: number) => void;
  uploadStatus: 'idle' | 'validating' | 'uploading' | 'processing' | 'success' | 'error';
  setUploadStatus: (value: 'idle' | 'validating' | 'uploading' | 'processing' | 'success' | 'error') => void;
  validationMessage: string;
  setValidationMessage: (value: string) => void;
  fileValidation: ShapefileValidationResult | null;
  setFileValidation: (value: ShapefileValidationResult | null) => void;
  processingStage: string;
  setProcessingStage: (value: string) => void;
  fileMetadata: Record<string, any> | null;
  setFileMetadata: (value: Record<string, any> | null) => void;
  resetUploader: () => void;
  // Add the missing properties for uploadFiles and isUploading
  uploadFiles: (files: File[], formData: any) => Promise<void>;
  isUploading: boolean;
}

const UploaderContext = createContext<UploaderContextType | undefined>(undefined);

export const UploaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [source, setSource] = useState('');
  const [organization, setOrganization] = useState<StakeholderOrganization | ''>('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'validating' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [validationMessage, setValidationMessage] = useState('');
  const [fileValidation, setFileValidation] = useState<ShapefileValidationResult | null>(null);
  const [processingStage, setProcessingStage] = useState('');
  const [fileMetadata, setFileMetadata] = useState<Record<string, any> | null>(null);
  const [isUploading, setIsUploading] = useState(false); // Added isUploading state

  const resetUploader = () => {
    setName('');
    setDescription('');
    setType('');
    setSource('');
    setOrganization('');
    setFile(null);
    setUploadProgress(0);
    setUploadStatus('idle');
    setValidationMessage('');
    setFileValidation(null);
    setProcessingStage('');
    setFileMetadata(null);
    setIsUploading(false); // Reset isUploading state
  };

  // Implement the uploadFiles function
  const uploadFiles = async (files: File[], formData: any) => {
    try {
      setIsUploading(true);
      setUploadStatus('uploading');
      setUploadProgress(10);
      
      // Simulate file validation
      setUploadStatus('validating');
      setUploadProgress(30);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate file upload
      setUploadStatus('uploading');
      setUploadProgress(60);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate processing
      setUploadStatus('processing');
      setUploadProgress(90);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set success
      setUploadStatus('success');
      setUploadProgress(100);
      
      // Save some metadata
      setFileMetadata({
        files: files.map(f => ({ name: f.name, size: f.size, type: f.type })),
        formData,
        uploadedAt: new Date().toISOString()
      });
      
      // Reset after success
      setTimeout(() => {
        resetUploader();
      }, 3000);
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      setValidationMessage('An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const value = {
    name, setName,
    description, setDescription,
    type, setType,
    source, setSource,
    organization, setOrganization,
    file, setFile,
    uploadProgress, setUploadProgress,
    uploadStatus, setUploadStatus,
    validationMessage, setValidationMessage,
    fileValidation, setFileValidation,
    processingStage, setProcessingStage,
    fileMetadata, setFileMetadata,
    resetUploader,
    // Add the new properties to the context value
    uploadFiles,
    isUploading
  };

  return (
    <UploaderContext.Provider value={value}>
      {children}
    </UploaderContext.Provider>
  );
};

export const useUploaderContext = () => {
  const context = useContext(UploaderContext);
  if (context === undefined) {
    throw new Error('useUploaderContext must be used within a UploaderProvider');
  }
  return context;
};
