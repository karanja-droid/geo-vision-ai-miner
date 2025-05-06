
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const OverviewTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Key Features</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Upload and validate geological shapefiles (SHP, SHX, DBF)</li>
          <li>Interactive visualization of shapefile data on maps</li>
          <li>Spatial analysis including buffer, intersect, and query operations</li>
          <li>Comprehensive report generation in multiple formats</li>
          <li>Integration with other GeoVision AI Miner modules</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Getting Started</h3>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Navigate to the GIS Shapefile Management page</li>
          <li>Upload your shapefile (as a ZIP archive or individual files)</li>
          <li>View your data on the interactive map</li>
          <li>Perform analysis operations as needed</li>
          <li>Generate reports in your preferred format</li>
        </ol>
      </div>
      
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          For optimal performance, we recommend compressing your shapefile files (SHP, SHX, DBF, etc.) into a ZIP archive before uploading.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default OverviewTab;
