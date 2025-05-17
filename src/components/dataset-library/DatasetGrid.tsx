
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { DatasetCard } from '../dataset/DatasetCard';
import { DatasetInfo } from '@/types';

interface DatasetGridProps {
  loading: boolean;
  isOnline: boolean;
  datasets: DatasetInfo[];
  onViewDataset: (dataset: DatasetInfo) => void;
  onDownloadDataset: (id: string) => void;
  onDeleteDataset: (id: string) => void;
  onViewDocuments: (dataset: DatasetInfo) => void;
}

export const DatasetGrid: React.FC<DatasetGridProps> = ({
  loading,
  isOnline,
  datasets,
  onViewDataset,
  onDownloadDataset,
  onDeleteDataset,
  onViewDocuments
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading datasets...</span>
      </div>
    );
  }
  
  if (datasets.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          {!isOnline 
            ? "No cached datasets available. Connect to the internet to access more datasets." 
            : "No datasets match your search criteria."}
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {datasets.map(dataset => (
        <DatasetCard 
          key={dataset.id}
          dataset={dataset} 
          onViewDataset={onViewDataset}
          onDownloadDataset={onDownloadDataset}
          onDeleteDataset={onDeleteDataset}
          onViewDocuments={onViewDocuments}
        />
      ))}
    </div>
  );
};
