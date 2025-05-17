
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatasetInfo } from '@/types';
import { DatasetVisualizationSection } from './DatasetVisualizationSection';
import { DatasetDescription } from './DatasetDescription';
import { DatasetRelatedDocs } from './DatasetRelatedDocs';

interface DetailsContentProps {
  dataset: DatasetInfo;
}

export const DetailsContent: React.FC<DetailsContentProps> = ({ dataset }) => {
  return (
    <ScrollArea className="flex-grow pr-4 h-[calc(90vh-180px)]">
      <div className="space-y-4">
        <DatasetVisualizationSection dataset={dataset} />
        <DatasetDescription dataset={dataset} />
        <DatasetRelatedDocs dataset={dataset} />
      </div>
    </ScrollArea>
  );
};
