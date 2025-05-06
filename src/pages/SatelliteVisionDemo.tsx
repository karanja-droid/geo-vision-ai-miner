import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Info, ExternalLink } from "lucide-react";
import SatelliteVisionCNN from '@/components/models/SatelliteVisionCNN';

// Define type for dataset options
interface DatasetOption {
  name: string;
  description: string;
  size: string;
  type: string;
  date: string;
}

const SatelliteVisionDemo: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  
  const handleDatasetSelect = (dataset: string) => {
    setSelectedDataset(dataset);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">SatelliteVision CNN Demo</h1>
            <p className="text-muted-foreground">
              Try our advanced mineral detection AI with sample satellite imagery
            </p>
          </div>
          <div className="space-x-2">
            <Button variant="outline" asChild>
              <Link to="/docs">
                Documentation
              </Link>
            </Button>
            <Button asChild>
              <Link to="/data-integration">
                Back to Data Integration
              </Link>
            </Button>
          </div>
        </div>
        
        <Alert className="mb-6 bg-primary/10 border-primary/20">
          <Info className="h-4 w-4" />
          <AlertTitle>Interactive Demo</AlertTitle>
          <AlertDescription>
            This demonstration allows you to experiment with SatelliteVision CNN using pre-loaded satellite imagery datasets.
            Select a dataset and run the analysis to see the model in action.
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sample Datasets</CardTitle>
                <CardDescription>
                  Choose a dataset to analyze with SatelliteVision CNN
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <DatasetOption
                    name="Copper Belt Region"
                    description="Landsat 8 imagery of a known copper mining district"
                    size="1.2 GB"
                    type="Landsat 8"
                    date="2023-10-15"
                    isSelected={selectedDataset === "copper-belt"}
                    onSelect={() => handleDatasetSelect("copper-belt")}
                  />
                  
                  <DatasetOption
                    name="Iron Ore Formation"
                    description="Sentinel-2 imagery with confirmed iron ore deposits"
                    size="845 MB"
                    type="Sentinel-2"
                    date="2023-12-03"
                    isSelected={selectedDataset === "iron-ore"}
                    onSelect={() => handleDatasetSelect("iron-ore")}
                  />
                  
                  <DatasetOption
                    name="Gold Exploration Area"
                    description="High-resolution WorldView-3 imagery of potential gold deposits"
                    size="2.1 GB"
                    type="WorldView-3"
                    date="2024-02-21"
                    isSelected={selectedDataset === "gold-area"}
                    onSelect={() => handleDatasetSelect("gold-area")}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Learn More</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/docs/satellite-vision" className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                  <span>SatelliteVision Documentation</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
                
                <Link to="/interactive-map" className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                  <span>Interactive Map Integration</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
                
                <Link to="/dataset-management" className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                  <span>Import Custom Datasets</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <SatelliteVisionCNN 
              selectedDataset={selectedDataset}
              onAnalyze={(options) => console.log("Analyzing with options:", options)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DatasetOption: React.FC<{
  name: string;
  description: string;
  size: string;
  type: string;
  date: string;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ name, description, size, type, date, isSelected, onSelect }) => {
  return (
    <div 
      className={`p-4 border rounded-md cursor-pointer transition-colors ${
        isSelected ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{name}</h3>
        {isSelected && <Badge variant="default">Selected</Badge>}
      </div>
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      <div className="flex flex-wrap gap-2 text-xs">
        <Badge variant="outline">{size}</Badge>
        <Badge variant="outline">{type}</Badge>
        <Badge variant="outline">{date}</Badge>
      </div>
    </div>
  );
};

export default SatelliteVisionDemo;
