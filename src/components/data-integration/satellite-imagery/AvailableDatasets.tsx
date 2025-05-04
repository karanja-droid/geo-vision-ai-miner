
import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Database, Image } from "lucide-react";
import { Link } from 'react-router-dom';

interface AvailableDatasetsProps {
  isRefreshing: boolean;
  progress: number;
}

const AvailableDatasets: React.FC<AvailableDatasetsProps> = ({ isRefreshing, progress }) => {
  return (
    <div className="border rounded-lg p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Database className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Available Datasets</h3>
      </div>

      {isRefreshing ? (
        <div className="space-y-4 py-4">
          <div className="text-center text-sm text-muted-foreground">Refreshing satellite imagery data...</div>
          <Progress value={progress} className="h-2" />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
            <div>
              <p className="font-medium">Landsat 8/9</p>
              <p className="text-xs text-muted-foreground">Multispectral imagery (30m resolution)</p>
            </div>
            <Badge>Active</Badge>
          </div>
          
          <div className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
            <div>
              <p className="font-medium">Sentinel-2</p>
              <p className="text-xs text-muted-foreground">13-band multispectral (10m resolution)</p>
            </div>
            <Badge>Active</Badge>
          </div>
          
          <div className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
            <div>
              <p className="font-medium">WorldView-3</p>
              <p className="text-xs text-muted-foreground">High-resolution imagery (0.3m resolution)</p>
            </div>
            <Badge>Active</Badge>
          </div>
        </div>
      )}
      
      <div className="pt-2">
        <Button 
          variant="default" 
          size="sm" 
          className="w-full"
          asChild
        >
          <Link to="/satellite-vision">
            <Image className="h-4 w-4 mr-2" />
            Analyze with SatelliteVision
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AvailableDatasets;
