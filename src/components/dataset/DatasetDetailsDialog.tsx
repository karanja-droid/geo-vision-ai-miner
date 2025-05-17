
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, MapPin, Database } from "lucide-react";
import { DatasetInfo } from '@/types';
import { DatasetVisualization } from './DatasetVisualization';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConnectivity } from '@/contexts/ConnectivityContext';
import { cacheDataset } from '@/services/DatasetCacheService';

interface DatasetDetailsDialogProps {
  dataset: DatasetInfo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DatasetDetailsDialog: React.FC<DatasetDetailsDialogProps> = ({
  dataset,
  open,
  onOpenChange
}) => {
  const { toast } = useToast();
  const { isOnline, addToCache, isCached } = useConnectivity();
  
  if (!dataset) return null;
  
  const datasetIsCached = isCached(dataset.id);
  
  const handleDownloadDataset = async () => {
    try {
      // If the dataset is already cached, just tell the user
      if (datasetIsCached) {
        toast({
          title: "Dataset Already Cached",
          description: `${dataset.name} is already available offline.`,
        });
        return;
      }
      
      // Create text content for the dataset
      const textContent = `
        DATASET: ${dataset.name}
        FORMAT: ${dataset.format || 'Unknown'}
        SIZE: ${dataset.size}
        SOURCE: ${dataset.source || 'Unknown'}
        DATE: ${dataset.uploadDate}
        COUNTRY: ${dataset.country || 'Unknown'}
        COORDINATES: ${dataset.coordinates ? dataset.coordinates.join(', ') : 'Unknown'}
        
        DESCRIPTION:
        ${dataset.description || 'No description available'}
        
        TAGS:
        ${dataset.tags ? dataset.tags.join(', ') : 'No tags available'}
        
        METADATA:
        Downloaded: ${new Date().toLocaleString()}
        Dataset ID: ${dataset.id}
        
        This is a simulated dataset export for demonstration purposes.
      `;
      
      // Cache the dataset
      await cacheDataset(dataset, 'library');
      await addToCache(dataset.id);
      
      // Use text/plain MIME type with matching .txt extension
      const blob = new Blob([textContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      
      // Create download link with .txt extension
      const link = document.createElement("a");
      link.href = url;
      link.download = `${dataset.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Dataset cached for offline use",
        description: `${dataset.name} can now be accessed when offline`,
      });
    } catch (error) {
      console.error("Failed to download dataset:", error);
      toast({
        title: "Download failed",
        description: "There was a problem downloading the dataset.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{dataset.name}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{dataset.country || 'Unknown'}</span>
              <span className="mx-2">•</span>
              <span>{dataset.format || 'Unknown'}</span>
              <span className="mx-2">•</span>
              <span>{dataset.size}</span>
              {datasetIsCached && (
                <>
                  <span className="mx-2">•</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Available Offline
                  </Badge>
                </>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-grow pr-4 h-[calc(90vh-180px)]">
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-md overflow-hidden">
              <DatasetVisualization dataset={dataset} />
            </div>
            
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
          </div>
        </ScrollArea>
        
        <DialogFooter className="flex items-center justify-between flex-row mt-4">
          <div className="text-xs text-muted-foreground">
            Dataset ID: {dataset.id}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button 
              variant={datasetIsCached ? "secondary" : "default"}
              onClick={handleDownloadDataset}
              disabled={!isOnline && !datasetIsCached}
            >
              {datasetIsCached ? (
                <>
                  <Database className="h-4 w-4 mr-1" />
                  Already Cached
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-1" />
                  Download & Cache
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
