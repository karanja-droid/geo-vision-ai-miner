
import React from "react";

const ReportsTab: React.FC = () => {
  console.log("Rendering ReportsTab component");
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Report Generation</h3>
        <p className="text-muted-foreground mb-4">
          Generate comprehensive reports from your shapefile data in various formats:
        </p>

        <div className="space-y-4">
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">PDF Reports</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
              <li>High-resolution maps with legends</li>
              <li>Tabular data from feature attributes</li>
              <li>Statistical summaries and charts</li>
              <li>Customizable templates and branding options</li>
            </ul>
          </div>
          
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Excel/CSV Reports</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
              <li>Complete attribute tables with filtering options</li>
              <li>Statistical calculations and pivot tables</li>
              <li>Embedded charts and graphs</li>
            </ul>
          </div>
          
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Image/Web Reports</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
              <li>Map exports as PNG or JPEG</li>
              <li>HTML reports for web embedding</li>
              <li>Interactive web maps with feature popups</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsTab;
