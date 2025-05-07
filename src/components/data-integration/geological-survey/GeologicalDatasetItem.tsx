
import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download } from "lucide-react";

export interface GeologicalDataset {
  id: string;
  name: string;
  type: string;
  size: string;
  coverage: string;
}

interface GeologicalDatasetItemProps {
  dataset: GeologicalDataset;
  isDownloading: boolean;
  downloadProgress: number;
  connected: boolean;
  hasActiveDownload: boolean;
  onDownload: (datasetId: string, datasetName: string) => void;
}

export const GeologicalDatasetItem: React.FC<GeologicalDatasetItemProps> = ({
  dataset,
  isDownloading,
  downloadProgress,
  connected,
  hasActiveDownload,
  onDownload,
}) => {
  const handleDownload = (e: React.MouseEvent) => {
    // Stop propagation to prevent the parent click handler from firing
    e.stopPropagation();
    onDownload(dataset.id, dataset.name);
  };

  return (
    <div className="p-4 flex items-center justify-between">
      <div>
        <div className="font-medium">{dataset.name}</div>
        <div className="text-sm text-muted-foreground">
          {dataset.type} • {dataset.size}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-xs">
          <span className="font-medium">Coverage: </span>
          {dataset.coverage}
        </div>
        {isDownloading ? (
          <div className="w-24">
            <Progress value={downloadProgress} className="h-1 w-full" />
            <p className="text-xs text-center mt-1">{downloadProgress}%</p>
          </div>
        ) : (
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleDownload}
            disabled={!connected || hasActiveDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        )}
      </div>
    </div>
  );
};
