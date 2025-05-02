
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Download, File } from "lucide-react";
import { Dataset } from '@/data/datasetLibraryData';

interface RelatedDocsDialogProps {
  dataset: Dataset | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RelatedDocsDialog: React.FC<RelatedDocsDialogProps> = ({ 
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
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Documents Related to {dataset.name}</DialogTitle>
          <DialogDescription>Technical reports and supplementary data</DialogDescription>
        </DialogHeader>
        
        {dataset.relatedDocs && dataset.relatedDocs.length > 0 ? (
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
        ) : (
          <p className="text-center py-4 text-muted-foreground">
            No related documents available for this dataset.
          </p>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
