
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRightLeft, Settings, Link as LinkIcon } from "lucide-react";

// Mock datasets for demonstration
const AVAILABLE_DATASETS = [
  { id: '1', name: 'Sierra Nevada Survey', format: 'GeoJSON', selected: false },
  { id: '2', name: 'Satellite Images 2023', format: 'GeoTIFF', selected: false },
  { id: '3', name: 'Historical Mining Data', format: 'CSV', selected: false },
  { id: '4', name: 'Fault Line Analysis', format: 'Shapefile', selected: false },
  { id: '5', name: 'Mineral Distribution Map', format: 'GeoJSON', selected: false }
];

// Integration methods
const INTEGRATION_METHODS = [
  { id: 'join', name: 'Spatial Join', description: 'Join datasets based on spatial relationships' },
  { id: 'overlay', name: 'Overlay Analysis', description: 'Overlay multiple layers for visual or computational analysis' },
  { id: 'merge', name: 'Attribute Merge', description: 'Combine datasets by matching attribute fields' },
  { id: 'interpolate', name: 'Interpolation', description: 'Create continuous surfaces from point data' },
  { id: 'extract', name: 'Extraction', description: 'Extract features based on spatial or attribute criteria' }
];

export const DatasetIntegration: React.FC = () => {
  const [datasets, setDatasets] = useState(AVAILABLE_DATASETS);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [outputName, setOutputName] = useState<string>("Integrated Dataset");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();
  
  const toggleDatasetSelection = (id: string) => {
    setDatasets(datasets.map(dataset => 
      dataset.id === id ? { ...dataset, selected: !dataset.selected } : dataset
    ));
  };
  
  const selectedDatasetCount = datasets.filter(d => d.selected).length;
  
  const handleIntegration = () => {
    const selectedDatasets = datasets.filter(d => d.selected);
    
    if (selectedDatasets.length < 2) {
      toast({
        title: "Selection Error",
        description: "Please select at least two datasets to integrate",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedMethod) {
      toast({
        title: "Method Required",
        description: "Please select an integration method",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Integration Complete",
        description: `${outputName} has been created and added to your library`,
      });
      
      // Reset selections
      setDatasets(datasets.map(dataset => ({ ...dataset, selected: false })));
      setSelectedMethod("");
    }, 3000);
  };
  
  const selectedMethodData = INTEGRATION_METHODS.find(method => method.id === selectedMethod);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-7">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LinkIcon className="h-5 w-5 mr-2" />
              Select Datasets to Integrate
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {datasets.map(dataset => (
                <div 
                  key={dataset.id}
                  className={`border rounded-md p-3 flex items-start gap-3 cursor-pointer hover:bg-accent transition-colors ${
                    dataset.selected ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => toggleDatasetSelection(dataset.id)}
                >
                  <Checkbox 
                    checked={dataset.selected}
                    onCheckedChange={() => toggleDatasetSelection(dataset.id)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium">{dataset.name}</div>
                    <div className="text-xs text-muted-foreground">{dataset.format}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              {selectedDatasetCount} datasets selected
            </p>
          </CardFooter>
        </Card>
      </div>
      
      <div className="md:col-span-5">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Integration Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="integration-method">Integration Method</Label>
                <Select 
                  value={selectedMethod} 
                  onValueChange={setSelectedMethod}
                  disabled={isProcessing}
                >
                  <SelectTrigger id="integration-method">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    {INTEGRATION_METHODS.map(method => (
                      <SelectItem key={method.id} value={method.id}>
                        {method.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedMethodData && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedMethodData.description}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="output-name">Output Dataset Name</Label>
                <input
                  id="output-name"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  value={outputName}
                  onChange={(e) => setOutputName(e.target.value)}
                  disabled={isProcessing}
                />
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <Label className="text-sm">Advanced Options</Label>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="auto-project" />
                    <Label htmlFor="auto-project" className="text-sm">
                      Auto-project to common coordinate system
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="validate-geometries" defaultChecked />
                    <Label htmlFor="validate-geometries" className="text-sm">
                      Validate and repair geometries
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="optimize-output" />
                    <Label htmlFor="optimize-output" className="text-sm">
                      Optimize output for visualization
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handleIntegration}
              disabled={isProcessing || selectedDatasetCount < 2}
            >
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              {isProcessing ? 'Processing...' : 'Integrate Datasets'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
