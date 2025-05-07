
import React from 'react';
import DatasetCard from './DatasetCard';
import { DatasetInfo } from '@/types';

interface DatasetsTabProps {
  datasets: DatasetInfo[];
}

const DatasetsTab: React.FC<DatasetsTabProps> = ({ datasets }) => {
  if (datasets.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        <p>No datasets available from the selected organization</p>
        <p className="text-sm mt-2">Try selecting a different organization or check back later</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {datasets.map((dataset) => (
        <DatasetCard key={dataset.id} dataset={dataset} />
      ))}
    </div>
  );
};

export default DatasetsTab;
