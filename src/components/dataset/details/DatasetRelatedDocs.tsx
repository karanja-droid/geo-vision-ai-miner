
import React from 'react';
import { DatasetInfo } from '@/types';
import { FileText } from "lucide-react";

interface DatasetRelatedDocsProps {
  dataset: DatasetInfo;
}

export const DatasetRelatedDocs: React.FC<DatasetRelatedDocsProps> = ({ dataset }) => {
  return (
    <div>
      <h3 className="font-medium mb-2">Related Documents</h3>
      {dataset.relatedDocs && dataset.relatedDocs.length > 0 ? (
        <ul className="text-sm space-y-1">
          {dataset.relatedDocs.map((doc) => (
            <li key={doc.id} className="flex items-center">
              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
              {doc.name} ({doc.type}, {doc.size})
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">No related documents available</p>
      )}
    </div>
  );
};
