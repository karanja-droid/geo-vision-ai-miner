
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Database, Map } from "lucide-react";

interface GeologicalOverviewTabProps {
  connecting: boolean;
  connectionProgress: number;
  connected: boolean;
  onConnect: () => void;
}

export const GeologicalOverviewTab: React.FC<GeologicalOverviewTabProps> = ({
  connecting,
  connectionProgress,
  connected,
  onConnect,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium mb-1">Data Source</h3>
          <p className="text-sm text-muted-foreground">Geological Survey Department</p>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-1">Format</h3>
          <p className="text-sm text-muted-foreground">Shapefile, GeoJSON, GeoTIFF</p>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-1">Size</h3>
          <p className="text-sm text-muted-foreground">1.8 GB Total</p>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-1">Last Updated</h3>
          <p className="text-sm text-muted-foreground">March 22, 2024</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-1">Description</h3>
        <p className="text-sm text-muted-foreground">
          This comprehensive dataset provides geological mapping information including rock types, 
          geological formations, fault lines, and stratigraphic data essential for mineral 
          exploration and geological analysis. The data is provided by the Geological Survey 
          Department and is updated quarterly.
        </p>
      </div>
      
      {connecting ? (
        <div className="space-y-2 pt-4">
          <Progress value={connectionProgress} />
          <p className="text-center text-sm text-muted-foreground">
            Connecting to Geological Survey data... {connectionProgress}%
          </p>
        </div>
      ) : connected ? (
        <div className="flex justify-between items-center pt-4">
          <p className="text-sm text-green-600 font-medium">
            Connected Successfully
          </p>
          <div className="flex gap-2">
            <Button size="sm">
              <Database className="h-4 w-4 mr-2" />
              Manage Data
            </Button>
            <Button size="sm" variant="outline">
              <Map className="h-4 w-4 mr-2" />
              View on Map
            </Button>
          </div>
        </div>
      ) : (
        <div className="pt-4">
          <Button onClick={onConnect}>
            Connect to Geological Survey Data
          </Button>
        </div>
      )}
    </div>
  );
};
