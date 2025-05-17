
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StakeholderOrganization } from '@/types';

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
  uploadStatus: 'idle' | 'uploading' | 'success' | 'error';
  setUploadStatus: (value: 'idle' | 'uploading' | 'success' | 'error') => void;
  validationMessage: string;
  setValidationMessage: (value: string) => void;
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
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [validationMessage, setValidationMessage] = useState('');

  const value = {
    name, setName,
    description, setDescription,
    type, setType,
    source, setSource,
    organization, setOrganization,
    file, setFile,
    uploadProgress, setUploadProgress,
    uploadStatus, setUploadStatus,
    validationMessage, setValidationMessage
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
