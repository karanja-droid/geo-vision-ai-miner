
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, MapPin, X, Layers, Calendar, HardDrive } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { GeologicalDataset } from './GeologicalDatasetItem';

interface GeologicalDatasetDetailViewProps {
  dataset: GeologicalDataset | null;
  isOpen: boolean;
  onClose: () => void;
  isDownloading: boolean;
  downloadProgress: number;
  connected: boolean;
  hasActiveDownload: boolean;
  onDownload: (datasetId: string, datasetName: string) => void;
}

export const GeologicalDatasetDetailView: React.FC<GeologicalDatasetDetailViewProps> = ({
  dataset,
  isOpen,
  onClose,
  isDownloading,
  downloadProgress,
  connected,
  hasActiveDownload,
  onDownload,
}) => {
  if (!dataset) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{dataset.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {dataset.type}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <HardDrive className="h-3 w-3" />
                  {dataset.size}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Coverage: {dataset.coverage}
                </Badge>
              </DialogDescription>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Dataset visualization placeholder */}
          <div className="bg-muted rounded-md h-52 flex items-center justify-center">
            <div className="text-center">
              <Layers className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">{dataset.type} Visualization</p>
              <p className="text-xs text-muted-foreground">Geological data visualization</p>
            </div>
          </div>
          
          {/* Dataset details */}
          <div>
            <h3 className="text-lg font-medium mb-2">Dataset Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium">Format</h4>
                <p className="text-muted-foreground">{dataset.type}</p>
              </div>
              <div>
                <h4 className="font-medium">Size</h4>
                <p className="text-muted-foreground">{dataset.size}</p>
              </div>
              <div>
                <h4 className="font-medium">Coverage</h4>
                <p className="text-muted-foreground">{dataset.coverage}</p>
              </div>
              <div>
                <h4 className="font-medium">Last Updated</h4>
                <p className="text-muted-foreground">2024-03-15</p>
              </div>
            </div>
          </div>
          
          {/* Dataset description */}
          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">
              This comprehensive geological dataset provides detailed information about the geological 
              structure, mineral composition, and stratigraphic features of the region. It includes 
              fault lines, lithological boundaries, and key geological formations mapped with high precision.
            </p>
          </div>
          
          {/* Usage notes */}
          <div>
            <h3 className="text-lg font-medium mb-2">Usage Notes</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Compatible with standard GIS software</li>
              <li>Includes metadata and attribute tables</li>
              <li>Coordinate system: WGS 84 / UTM</li>
              <li>Data collected through field surveys and remote sensing</li>
            </ul>
          </div>
        </div>
        
        <DialogFooter className="flex items-center justify-between sm:justify-between flex-row">
          {isDownloading ? (
            <div className="w-full">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Downloading...</span>
                <span className="text-sm font-medium">{downloadProgress}%</span>
              </div>
              <Progress value={downloadProgress} className="h-2 w-full" />
            </div>
          ) : (
            <>
              <div className="text-xs text-muted-foreground">
                Dataset ID: {dataset.id}
              </div>
              <Button 
                onClick={() => onDownload(dataset.id, dataset.name)}
                disabled={!connected || hasActiveDownload}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Dataset
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
