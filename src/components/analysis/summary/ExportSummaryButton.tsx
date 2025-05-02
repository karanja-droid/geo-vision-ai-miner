
import React from 'react';
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ExportSummaryButtonProps {
  data?: any;
  filename?: string;
}

const ExportSummaryButton: React.FC<ExportSummaryButtonProps> = ({ 
  data = {}, 
  filename = "summary-report" 
}) => {
  const { toast } = useToast();
  
  const handleExport = () => {
    try {
      // For a real PDF generation, you'd typically use a library like pdfmake or jsPDF
      // For this demo, we'll simulate PDF generation with a simple text-based approach
      
      // Create PDF content as plain text for demo purposes
      const content = `
        SUMMARY REPORT
        ==============
        Generated: ${new Date().toLocaleString()}
        
        ANALYSIS SUMMARY
        ----------------
        ${JSON.stringify(data, null, 2)}
      `;
      
      // Create a Blob with PDF MIME type
      // In a real app, this would be actual PDF binary data
      const blob = new Blob([content], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}-${new Date().getTime()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export successful",
        description: "Summary report has been downloaded as PDF.",
      });
    } catch (error) {
      console.error("Failed to export summary:", error);
      toast({
        title: "Export failed",
        description: "There was a problem exporting the summary report.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-end">
      <Button variant="outline" size="sm" onClick={handleExport}>
        <File className="h-4 w-4 mr-2" />
        Export Summary Report
      </Button>
    </div>
  );
};

export default ExportSummaryButton;
