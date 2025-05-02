
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
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
      // Create text content for the export
      const textContent = `
        SUMMARY REPORT
        ==============
        Generated: ${new Date().toLocaleString()}
        
        ANALYSIS SUMMARY
        ----------------
        ${JSON.stringify(data, null, 2)}
      `;
      
      // Create a proper text file
      const blob = new Blob([textContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      
      // Create download link with .txt extension
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}-${new Date().getTime()}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export successful",
        description: "Summary report has been downloaded as a text file.",
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
        <FileText className="h-4 w-4 mr-2" />
        Export Summary Report
      </Button>
    </div>
  );
};

export default ExportSummaryButton;
