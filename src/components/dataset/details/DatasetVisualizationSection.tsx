
import React from 'react';
import { DatasetInfo } from '@/types';
import { DatasetVisualization } from '../DatasetVisualization';

interface DatasetVisualizationSectionProps {
  dataset: DatasetInfo;
}

export const DatasetVisualizationSection: React.FC<DatasetVisualizationSectionProps> = ({ dataset }) => {
  return (
    <div className="aspect-video bg-muted rounded-md overflow-hidden">
      <DatasetVisualization dataset={dataset} />
    </div>
  );
};
