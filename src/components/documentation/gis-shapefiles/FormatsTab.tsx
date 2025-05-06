
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const FormatsTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Supported File Formats</h3>
        <p className="text-muted-foreground mb-4">
          Our platform supports the following GIS file formats:
        </p>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border p-2 text-left">Format</th>
              <th className="border p-2 text-left">Extensions</th>
              <th className="border p-2 text-left">Support Level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">ESRI Shapefile</td>
              <td className="border p-2">.shp, .shx, .dbf, .prj</td>
              <td className="border p-2">Full support</td>
            </tr>
            <tr>
              <td className="border p-2">GeoJSON</td>
              <td className="border p-2">.geojson, .json</td>
              <td className="border p-2">Full support</td>
            </tr>
            <tr>
              <td className="border p-2">KML/KMZ</td>
              <td className="border p-2">.kml, .kmz</td>
              <td className="border p-2">Read-only</td>
            </tr>
            <tr>
              <td className="border p-2">GeoPackage</td>
              <td className="border p-2">.gpkg</td>
              <td className="border p-2">Read-only</td>
            </tr>
            <tr>
              <td className="border p-2">CSV with coordinates</td>
              <td className="border p-2">.csv</td>
              <td className="border p-2">Import only</td>
            </tr>
          </tbody>
        </table>
        
        <Alert className="mt-4">
          <Info className="h-4 w-4" />
          <AlertDescription>
            When working with ESRI Shapefiles, all component files (.shp, .shx, .dbf, .prj) should have the same base filename and be included in the upload.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default FormatsTab;
