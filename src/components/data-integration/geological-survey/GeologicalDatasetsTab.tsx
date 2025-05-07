
import React, { useState, useMemo } from 'react';
import { GeologicalDatasetItem, GeologicalDataset } from './GeologicalDatasetItem';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FileJson, Filter } from "lucide-react";
import { GeologicalDatasetDetailView } from './GeologicalDatasetDetailView';

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
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDataset, setSelectedDataset] = useState<GeologicalDataset | null>(null);

  // Extract unique dataset types
  const datasetTypes = useMemo(() => {
    const types = new Set<string>();
    availableDatasets.forEach(dataset => {
      types.add(dataset.type);
    });
    return Array.from(types);
  }, [availableDatasets]);

  // Filter datasets based on selected type
  const filteredDatasets = useMemo(() => {
    if (!selectedType) return availableDatasets;
    return availableDatasets.filter(dataset => dataset.type === selectedType);
  }, [availableDatasets, selectedType]);

  // Handle dataset selection
  const handleDatasetSelect = (dataset: GeologicalDataset) => {
    setSelectedDataset(dataset);
  };

  // Handle closing the detail view
  const handleCloseDetailView = () => {
    setSelectedDataset(null);
  };

  return (
    <div className="space-y-4">
      {datasetTypes.length > 1 && (
        <div className="flex items-center gap-2 pb-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter by type:</span>
          <ToggleGroup type="single" value={selectedType || ''} onValueChange={(value) => setSelectedType(value || null)}>
            {datasetTypes.map(type => (
              <ToggleGroupItem key={type} value={type} aria-label={`Filter by ${type}`} size="sm">
                <FileJson className="h-4 w-4 mr-1" />
                {type}
              </ToggleGroupItem>
            ))}
            {selectedType && (
              <button 
                onClick={() => setSelectedType(null)}
                className="text-xs text-primary hover:underline ml-2"
              >
                Clear filter
              </button>
            )}
          </ToggleGroup>
        </div>
      )}
      
      <div className="border rounded-md divide-y">
        {filteredDatasets.length > 0 ? (
          filteredDatasets.map((dataset) => (
            <div 
              key={dataset.id} 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleDatasetSelect(dataset)}
            >
              <GeologicalDatasetItem
                dataset={dataset}
                isDownloading={downloadingDataset === dataset.id}
                downloadProgress={downloadProgress}
                connected={connected}
                hasActiveDownload={!!downloadingDataset}
                onDownload={(id, name) => {
                  // Prevent the click event from triggering dataset selection
                  // when clicking the download button
                  onDownload(id, name);
                }}
              />
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-muted-foreground">
            {selectedType 
              ? `No ${selectedType} datasets available.` 
              : 'No datasets available.'}
          </div>
        )}
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        {connected ? (
          <p>All datasets are available for download and analysis</p>
        ) : (
          <p>Connect to the data source to access these datasets</p>
        )}
      </div>

      {/* Dataset Detail View */}
      <GeologicalDatasetDetailView 
        dataset={selectedDataset}
        isOpen={!!selectedDataset}
        onClose={handleCloseDetailView}
        isDownloading={!!downloadingDataset && !!selectedDataset && downloadingDataset === selectedDataset.id}
        downloadProgress={downloadProgress}
        connected={connected}
        hasActiveDownload={!!downloadingDataset}
        onDownload={onDownload}
      />
    </div>
  );
};
