
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Database, Download, Eye, Trash2, MapPin, FileText } from "lucide-react";
import { DatasetInfo } from '@/types';
import { useConnectivity } from '@/contexts/ConnectivityContext';

interface DatasetCardProps {
  dataset: DatasetInfo;
  onViewDataset: (dataset: DatasetInfo) => void;
  onDownloadDataset: (id: string) => void;
  onDeleteDataset: (id: string) => void;
  onViewDocuments: (dataset: DatasetInfo) => void;
}

export const DatasetCard: React.FC<DatasetCardProps> = ({
  dataset,
  onViewDataset,
  onDownloadDataset,
  onDeleteDataset,
  onViewDocuments
}) => {
  const { toast } = useToast();
  const { isCached, isOnline } = useConnectivity();
  const datasetIsCached = isCached(dataset.id);
  
  const handleDownload = () => {
    // Call the passed download handler
    onDownloadDataset(dataset.id);
    
    // Show toast notification
    toast({
      title: "Download started",
      description: `Downloading ${dataset.name} (${dataset.size})`,
    });
  };
  
  return (
    <Card key={dataset.id} className="flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              {dataset.name}
            </CardTitle>
            <div className="flex flex-wrap gap-1 mt-1">
              <Badge>{dataset.format || 'Unknown'}</Badge>
              <Badge variant="outline">{dataset.source || 'Unknown'}</Badge>
              <Badge variant="secondary" className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" /> {dataset.country || 'Unknown'}
              </Badge>
              {datasetIsCached && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Available Offline
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <p className="text-sm">{dataset.description}</p>
        <div className="mt-3">
          <div className="flex items-center text-xs text-muted-foreground">
            <span className="mr-3">Size: {dataset.size}</span>
            <span>Added: {dataset.uploadDate}</span>
          </div>
          {dataset.tags && dataset.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {dataset.tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          {dataset.relatedDocs && dataset.relatedDocs.length > 0 && (
            <div className="mt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs flex items-center text-primary"
                onClick={() => onViewDocuments(dataset)}
              >
                <FileText className="h-3.5 w-3.5 mr-1" /> 
                View {dataset.relatedDocs.length} Related Documents
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onViewDataset(dataset)}
          disabled={!isOnline && !datasetIsCached}
        >
          <Eye className="h-4 w-4 mr-1" /> View
        </Button>
        <div className="space-x-2">
          {isOnline && (
            <Button 
              variant={datasetIsCached ? "secondary" : "outline"} 
              size="sm" 
              onClick={handleDownload}
            >
              {datasetIsCached ? (
                <Database className="h-4 w-4 mr-1" />
              ) : (
                <Download className="h-4 w-4 mr-1" />
              )}
              {datasetIsCached ? 'Cached' : 'Download'}
            </Button>
          )}
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => onDeleteDataset(dataset.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
