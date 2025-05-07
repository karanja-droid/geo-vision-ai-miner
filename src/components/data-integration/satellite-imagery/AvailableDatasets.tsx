
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Image } from "lucide-react";

interface AvailableDatasetsProps {
  isRefreshing: boolean;
  progress: number;
}

const AvailableDatasets: React.FC<AvailableDatasetsProps> = ({ 
  isRefreshing, 
  progress 
}) => {
  const datasets = [
    {
      name: "Sentinel-2 Multispectral",
      type: "Optical",
      resolution: "10m",
      updated: "Daily",
      size: "1.8 TB"
    },
    {
      name: "Landsat 9 OLI/TIRS",
      type: "Optical/Thermal",
      resolution: "15-30m",
      updated: "16 days",
      size: "950 GB"
    },
    {
      name: "WorldView-3 SWIR",
      type: "Shortwave Infrared",
      resolution: "3.7m",
      updated: "On-demand",
      size: "540 GB"
    }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Datasets</CardTitle>
      </CardHeader>
      <CardContent>
        {isRefreshing ? (
          <div className="space-y-4">
            <p className="text-sm">Refreshing dataset information...</p>
            <Progress value={progress} className="h-2" />
          </div>
        ) : (
          <div className="space-y-4">
            {datasets.map((dataset, index) => (
              <div 
                key={index} 
                className="flex items-start p-3 rounded-md bg-muted/30 border border-border/50"
              >
                <Image className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">{dataset.name}</p>
                    <Badge variant="outline" className="ml-2">
                      {dataset.type}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 text-xs">
                    <p className="text-muted-foreground">
                      Resolution: <span className="text-foreground">{dataset.resolution}</span>
                    </p>
                    <p className="text-muted-foreground">
                      Updated: <span className="text-foreground">{dataset.updated}</span>
                    </p>
                    <p className="text-muted-foreground">
                      Size: <span className="text-foreground">{dataset.size}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AvailableDatasets;
