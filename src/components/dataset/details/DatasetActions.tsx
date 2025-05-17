
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Database } from "lucide-react";
import { DatasetInfo } from '@/types';

interface DatasetActionsProps {
  dataset: DatasetInfo;
  datasetIsCached: boolean;
  isOnline: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export const DatasetActions: React.FC<DatasetActionsProps> = ({
  dataset,
  datasetIsCached,
  isOnline,
  onClose,
  onDownload
}) => {
  return (
    <div className="flex items-center justify-between flex-row mt-4">
      <div className="text-xs text-muted-foreground">
        Dataset ID: {dataset.id}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button 
          variant={datasetIsCached ? "secondary" : "default"}
          onClick={onDownload}
          disabled={!isOnline && !datasetIsCached}
        >
          {datasetIsCached ? (
            <>
              <Database className="h-4 w-4 mr-1" />
              Already Cached
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-1" />
              Download & Cache
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
