
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Download, FilePdf } from "lucide-react";
import { Dataset } from '@/data/datasetLibraryData';
import DatasetVisualization from './DatasetVisualization';

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
  
  const handleDownloadDocument = (doc: any) => {
    try {
      // In a real app, this would fetch the actual PDF file from a server
      // For this demo, we'll create a simple text representation of PDF content
      
      const pdfContent = `
        DOCUMENT: ${doc.name}
        TYPE: ${doc.type}
        SIZE: ${doc.size}
        RELATED DATASET: ${dataset.name}
        
        METADATA:
        Downloaded: ${new Date().toLocaleString()}
        Document ID: ${doc.id}
        
        This is a simulated PDF document for demonstration purposes.
      `;
      
      // Create a blob with PDF MIME type
      const blob = new Blob([pdfContent], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement("a");
      link.href = url;
      link.download = `${doc.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download started",
        description: `Downloading ${doc.name}`,
      });
    } catch (error) {
      console.error("Failed to download document:", error);
      toast({
        title: "Download failed",
        description: "There was a problem downloading the document.",
        variant: "destructive",
      });
    }
  };
  
  const handleExportData = () => {
    try {
      // Create a formatted PDF content for the dataset
      const pdfContent = `
        DATASET EXPORT: ${dataset.name}
        =======================${new Array(dataset.name.length).fill('=').join('')}
        
        METADATA:
        ID: ${dataset.id}
        Format: ${dataset.format}
        Source: ${dataset.source}
        Size: ${dataset.size}
        Date: ${dataset.date}
        Country: ${dataset.country}
        Coordinates: ${dataset.coordinates[0]}, ${dataset.coordinates[1]}
        
        DESCRIPTION:
        ${dataset.description}
        
        TAGS:
        ${dataset.tags.join(', ')}
        
        RELATED DOCUMENTS:
        ${dataset.relatedDocs.map(doc => `- ${doc.name} (${doc.type}, ${doc.size})`).join('\n')}
        
        Exported on: ${new Date().toLocaleString()}
      `;
      
      // Create a blob with PDF MIME type
      const blob = new Blob([pdfContent], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement("a");
      link.href = url;
      link.download = `${dataset.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export successful",
        description: `Dataset ${dataset.name} has been exported as PDF`,
      });
    } catch (error) {
      console.error("Failed to export dataset:", error);
      toast({
        title: "Export failed",
        description: "There was a problem exporting the dataset.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{dataset.name}</DialogTitle>
          <DialogDescription>Detailed information and visualization</DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[65vh] overflow-y-auto pr-4">
          <div className="space-y-6">
            <DatasetVisualization dataset={dataset} />
            
            {dataset.relatedDocs && dataset.relatedDocs.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Related Documents</h4>
                <div className="max-w-full overflow-x-auto">
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
                            <FilePdf className="h-4 w-4 mr-2" />
                            {doc.name}
                          </TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>{doc.size}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDownloadDocument(doc)}
                            >
                              <Download className="h-4 w-4 mr-1" /> Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button onClick={handleExportData}>Export Data</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
