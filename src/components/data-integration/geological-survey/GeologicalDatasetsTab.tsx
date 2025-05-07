
import React from 'react';
import { GeologicalDatasetItem, GeologicalDataset } from './GeologicalDatasetItem';

interface GeologicalDatasetsTabProps {
  availableDatasets: GeologicalDataset[];
  connected: boolean;
  downloadingDataset: string | null;
  downloadProgress: number;
  onDownload: (datasetId: string, datasetName: string) => void;
}

export const GeologicalDatasetsTab: React.FC<GeologicalDatasetsTabProps> = ({
  availableDatasets,
  connected,
  downloadingDataset,
  downloadProgress,
  onDownload,
}) => {
  return (
    <div className="space-y-4">
      <div className="border rounded-md divide-y">
        {availableDatasets.map((dataset) => (
          <GeologicalDatasetItem
            key={dataset.id}
            dataset={dataset}
            isDownloading={downloadingDataset === dataset.id}
            downloadProgress={downloadProgress}
            connected={connected}
            hasActiveDownload={!!downloadingDataset}
            onDownload={onDownload}
          />
        ))}
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        {connected ? (
          <p>All datasets are available for download and analysis</p>
        ) : (
          <p>Connect to the data source to access these datasets</p>
        )}
      </div>
    </div>
  );
};
