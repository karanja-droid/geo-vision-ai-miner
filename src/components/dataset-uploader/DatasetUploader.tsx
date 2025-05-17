
import React from 'react';
import { DatasetForm } from './DatasetForm';
import { UploadStatus } from './UploadStatus';
import { UploaderProvider } from './UploaderContext';

export const DatasetUploader: React.FC = () => {
  return (
    <UploaderProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DatasetForm />
        <UploadStatus />
      </div>
    </UploaderProvider>
  );
};
