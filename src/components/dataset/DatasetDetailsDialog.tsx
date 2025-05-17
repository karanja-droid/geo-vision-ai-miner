
import React from 'react';
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { DatasetInfo } from '@/types';
import { useConnectivity } from '@/contexts/ConnectivityContext';
import { cacheDataset } from '@/services/DatasetCacheService';
import { DatasetHeader } from './details/DatasetHeader';
import { DetailsContent } from './details/DetailsContent';
import { DatasetActions } from './details/DatasetActions';

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
        <DatasetHeader 
          dataset={dataset}
          datasetIsCached={datasetIsCached}
        />
        
        <DetailsContent dataset={dataset} />
        
        <DialogFooter>
          <DatasetActions 
            dataset={dataset}
            datasetIsCached={datasetIsCached}
            isOnline={isOnline}
            onClose={() => onOpenChange(false)}
            onDownload={handleDownloadDataset}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
