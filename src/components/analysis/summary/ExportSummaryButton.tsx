
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const ExportSummaryButton: React.FC = () => {
  return (
    <div className="flex justify-end">
      <Button variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Export Summary Report
      </Button>
    </div>
  );
};

export default ExportSummaryButton;
