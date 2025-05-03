
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Database, Layers, Image } from "lucide-react";
import { DataSourceCard } from './DataSourceCard';

export const DataSourcesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Alert variant="default" className="bg-primary/10 border-primary/20">
        <Database className="h-5 w-5" />
        <AlertTitle>Integrated Data Sources</AlertTitle>
        <AlertDescription>
          Connect to real geological data sources to power accurate mineral predictions
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DataSourceCard 
          title="Geological Surveys"
          description="Shapefiles containing geological maps, fault lines, and lithological information"
          status="Ready to connect"
          icon={<Layers className="h-5 w-5 text-primary" />}
          formats={["Shapefile", "GeoJSON", "GeoTIFF"]}
          source="Geological Survey Department"
        />
        
        <DataSourceCard 
          title="Satellite Imagery"
          description="Multispectral imagery for mineral signature detection and terrain analysis"
          status="Connected"
          icon={<Image className="h-5 w-5 text-primary" />}
          formats={["Landsat 8/9", "Sentinel-2", "WorldView-3"]}
          source="Remote Sensing Agency"
        />

        <DataSourceCard 
          title="LIDAR & Elevation Data"
          description="High-resolution digital elevation models for topographic analysis"
          status="Ready to connect"
          icon={<Layers className="h-5 w-5 text-primary" />}
          formats={["LAS", "DTM", "DEM"]}
          source="Aerial Survey Division"
        />
        
        <DataSourceCard 
          title="Geochemical Assays"
          description="Laboratory results from field samples providing ground truth data"
          status="Connected"
          icon={<Database className="h-5 w-5 text-primary" />}
          formats={["CSV", "Excel", "JSON"]}
          source="Mining Company Records"
        />
      </div>

      <div className="mt-6">
        <Button className="mr-2">Connect New Data Source</Button>
        <Button variant="outline">Manage Connections</Button>
      </div>
    </div>
  );
};
