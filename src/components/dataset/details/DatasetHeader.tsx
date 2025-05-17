
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { DatasetInfo } from '@/types';

interface DatasetHeaderProps {
  dataset: DatasetInfo;
  datasetIsCached: boolean;
}

export const DatasetHeader: React.FC<DatasetHeaderProps> = ({
  dataset,
  datasetIsCached
}) => {
  return (
    <DialogHeader>
      <DialogTitle>{dataset.name}</DialogTitle>
      <DialogDescription>
        <div className="flex items-center mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{dataset.country || 'Unknown'}</span>
          <span className="mx-2">•</span>
          <span>{dataset.format || 'Unknown'}</span>
          <span className="mx-2">•</span>
          <span>{dataset.size}</span>
          {datasetIsCached && (
            <>
              <span className="mx-2">•</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Available Offline
              </Badge>
            </>
          )}
        </div>
      </DialogDescription>
    </DialogHeader>
  );
};
