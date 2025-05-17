
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Trash, FileText, BarChart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { DatasetInfo } from '@/types';

interface DatasetGridProps {
  loading: boolean;
  isOnline: boolean;
  datasets: DatasetInfo[];
  onViewDataset: (dataset: DatasetInfo) => void;
  onDownloadDataset: (id: string) => void;
  onDeleteDataset: (id: string) => void;
  onViewDocuments: (dataset: DatasetInfo) => void;
  onAnalyzeDataset: (dataset: DatasetInfo) => void;
}

export const DatasetGrid: React.FC<DatasetGridProps> = ({
  loading,
  isOnline,
  datasets,
  onViewDataset,
  onDownloadDataset,
  onDeleteDataset,
  onViewDocuments,
  onAnalyzeDataset
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Card key={i} className="border">
            <CardContent className="p-0">
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="border-t p-3 flex justify-end space-x-2">
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (datasets.length === 0) {
    return (
      <div className="border rounded-md p-8 text-center">
        <p className="text-muted-foreground">No datasets available.</p>
        {!isOnline && (
          <p className="text-sm text-muted-foreground mt-2">
            You are currently offline. Connect to the internet to view more datasets.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {datasets.map(dataset => (
        <Card key={dataset.id} className="border">
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="font-medium truncate" title={dataset.name}>
                  {dataset.name}
                </div>
                <Badge variant="outline" className="ml-2 whitespace-nowrap">
                  {dataset.type}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1 truncate" title={dataset.description || ''}>
                {dataset.description || 'No description'}
              </p>
              <div className="mt-3 flex items-center">
                <span className="text-xs text-muted-foreground">
                  {new Date(dataset.uploadDate).toLocaleDateString()}
                </span>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {(dataset.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {dataset.tags && dataset.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="border-t p-3 flex justify-end space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onViewDataset(dataset)}
                title="View Dataset"
              >
                <Eye className="h-4 w-4" />
              </Button>
              {isOnline && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDownloadDataset(dataset.id)}
                  title="Download for Offline Use"
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onViewDocuments(dataset)}
                title="View Related Documents"
              >
                <FileText className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onAnalyzeDataset(dataset)}
                title="Analyze Dataset"
              >
                <BarChart className="h-4 w-4" />
              </Button>
              {isOnline && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteDataset(dataset.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete Dataset"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
