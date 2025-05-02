
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
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
      // Create the export data
      const exportData = {
        generatedAt: new Date().toISOString(),
        summary: data,
      };
      
      // Convert to JSON string
      const jsonString = JSON.stringify(exportData, null, 2);
      
      // Create a blob and download
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      
      link.href = url;
      link.download = `${filename}-${new Date().getTime()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export successful",
        description: "Summary report has been downloaded.",
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
        <Download className="h-4 w-4 mr-2" />
        Export Summary Report
      </Button>
    </div>
  );
};

export default ExportSummaryButton;
