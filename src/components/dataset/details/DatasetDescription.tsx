
import React from 'react';
import { DatasetInfo } from '@/types';
import { Badge } from "@/components/ui/badge";

interface DatasetDescriptionProps {
  dataset: DatasetInfo;
}

export const DatasetDescription: React.FC<DatasetDescriptionProps> = ({ dataset }) => {
  return (
    <>
      <div>
        <h3 className="font-medium mb-2">Description</h3>
        <p className="text-sm text-muted-foreground">{dataset.description}</p>
      </div>
      
      {dataset.tags && dataset.tags.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {dataset.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium mb-2">Source</h3>
          <p className="text-sm text-muted-foreground">{dataset.source || 'Unknown'}</p>
        </div>
        <div>
          <h3 className="font-medium mb-2">Date</h3>
          <p className="text-sm text-muted-foreground">{dataset.uploadDate}</p>
        </div>
      </div>
    </>
  );
};
