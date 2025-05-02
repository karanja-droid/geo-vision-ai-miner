
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Download, FileText, MapPin } from "lucide-react";
import { Dataset } from '@/data/datasetLibraryData';
import { DatasetVisualization } from './DatasetVisualization';
import { ScrollArea } from "@/components/ui/scroll-area";

interface DatasetDetailsDialogProps {
  dataset: Dataset | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DatasetDetailsDialog: React.FC<DatasetDetailsDialogProps> = ({
  dataset,
  open,
  onOpenChange
}) => {
  const { toast } = useToast();
  
  if (!dataset) return null;
  
  const handleDownloadDataset = () => {
    try {
      // Create text content for the dataset
      const textContent = `
        DATASET: ${dataset.name}
        FORMAT: ${dataset.format}
        SIZE: ${dataset.size}
        SOURCE: ${dataset.source}
        DATE: ${dataset.date}
        COUNTRY: ${dataset.country}
        COORDINATES: ${dataset.coordinates.join(', ')}
        
        DESCRIPTION:
        ${dataset.description}
        
        TAGS:
        ${dataset.tags.join(', ')}
        
        METADATA:
        Downloaded: ${new Date().toLocaleString()}
        Dataset ID: ${dataset.id}
        
        This is a simulated dataset export for demonstration purposes.
      `;
      
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
        title: "Download started",
        description: `Downloading ${dataset.name} as a text file`,
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
              <span>{dataset.country}</span>
              <span className="mx-2">•</span>
              <span>{dataset.format}</span>
              <span className="mx-2">•</span>
              <span>{dataset.size}</span>
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
            
            <div>
              <h3 className="font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {dataset.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Source</h3>
                <p className="text-sm text-muted-foreground">{dataset.source}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Date</h3>
                <p className="text-sm text-muted-foreground">{dataset.date}</p>
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
            <Button variant="default" onClick={handleDownloadDataset}>
              <Download className="h-4 w-4 mr-1" />
              Download Dataset
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
