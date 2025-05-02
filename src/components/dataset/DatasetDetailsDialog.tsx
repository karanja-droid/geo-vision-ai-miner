
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, File } from "lucide-react";
import { Dataset } from '@/data/datasetLibraryData';

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
  if (!dataset) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{dataset.name}</DialogTitle>
          <DialogDescription>Detailed information and visualization</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-muted aspect-video rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Dataset visualization would appear here</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Dataset Information</h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Source:</span> {dataset.source}</p>
                <p><span className="font-medium">Format:</span> {dataset.format}</p>
                <p><span className="font-medium">Size:</span> {dataset.size}</p>
                <p><span className="font-medium">Date Added:</span> {dataset.date}</p>
                <p><span className="font-medium">Country:</span> {dataset.country}</p>
                <p>
                  <span className="font-medium">Coordinates:</span> 
                  {dataset.coordinates[0]}, {dataset.coordinates[1]}
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-sm">{dataset.description}</p>
              
              <h4 className="font-medium mt-4 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-1">
                {dataset.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {dataset.relatedDocs && dataset.relatedDocs.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Related Documents</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataset.relatedDocs.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="flex items-center">
                        <File className="h-4 w-4 mr-2" />
                        {doc.name}
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button>Export Data</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
