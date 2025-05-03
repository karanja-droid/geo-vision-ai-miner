
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Cube, Layers3, Settings2, FileAxis3d, Download } from "lucide-react";
import GeoStructure3DVisualization from '@/components/models/GeoStructure3DVisualization';

const GeoStructure3DDemo: React.FC = () => {
  const [activeDataset, setActiveDataset] = useState<string>("copper_deposit");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [visualizationMode, setVisualizationMode] = useState<string>("3d_structure");
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate loading the model
    setIsModelLoaded(false);
    const timer = setTimeout(() => {
      setIsModelLoaded(true);
      toast({
        title: "Model Loaded",
        description: "GeoStructure-3D model has been initialized successfully",
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [activeDataset, toast]);
  
  const handleRunAnalysis = () => {
    setIsProcessing(true);
    toast({
      title: "Processing Started",
      description: "Generating 3D subsurface model. This may take a moment...",
    });
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Analysis Complete",
        description: "3D model has been generated successfully",
      });
    }, 3500);
  };
  
  const handleDownloadReport = () => {
    // Create text content for the report
    const reportContent = `# GeoStructure-3D Analysis Report
Dataset: ${activeDataset.replace('_', ' ').toUpperCase()}
Analysis Date: ${new Date().toLocaleString()}
Visualization Mode: ${visualizationMode.replace('_', ' ').toUpperCase()}

## Model Parameters
- Layers: 7
- Neurons per layer: 128
- Activation: ReLU
- Optimizer: Adam
- Learning Rate: 0.001

## Analysis Results
The GeoStructure-3D model has identified several key geological features:

1. Main mineralization zone at depths between 250-450m
2. Fault line trending NE-SW with 75° dip angle
3. High porosity zones correlating with potential fluid pathways
4. Structural anomalies suggesting possible intrusive bodies

## Recommendations
- Focus drilling efforts on the northeastern section
- Consider additional geophysical surveys to confirm fault orientation
- Integrate model with existing geological maps for validation
- Update model with new drill core data when available

This report was generated using the GeoStructure-3D Graph Convolutional Network.
`;

    // Create blob and download
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `geostructure3d_report_${activeDataset}_${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report Downloaded",
      description: "Analysis report has been saved to your device",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <FileAxis3d className="mr-2 h-8 w-8 text-primary" />
              GeoStructure-3D Demo
            </h1>
            <p className="text-muted-foreground">
              Advanced 3D Graph Convolutional Network for geological structure modeling
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/data-integration">Back to Data Integration</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="h-[600px] overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>3D Visualization</CardTitle>
                <CardDescription>
                  Interactive subsurface visualization using GeoStructure-3D model
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 h-[520px]">
                <GeoStructure3DVisualization 
                  dataset={activeDataset} 
                  visualizationMode={visualizationMode}
                  isLoading={!isModelLoaded || isProcessing}
                />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Structure Interpretation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2">Fault Lines</Badge>
                        <span className="text-sm">3 detected</span>
                      </div>
                      <Badge variant="default">High Confidence</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2">Folding Patterns</Badge>
                        <span className="text-sm">Anticline structure</span>
                      </div>
                      <Badge variant="secondary">Medium Confidence</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2">Mineralization</Badge>
                        <span className="text-sm">250-450m depth</span>
                      </div>
                      <Badge variant="default">High Confidence</Badge>
                    </div>
                    
                    <Alert>
                      <AlertDescription>
                        Model suggests a previously undetected fault line in the northeastern section
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Model Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-muted rounded p-2">
                        <div className="text-xs text-muted-foreground">Accuracy</div>
                        <div className="font-medium">87.2%</div>
                      </div>
                      <div className="bg-muted rounded p-2">
                        <div className="text-xs text-muted-foreground">Latency</div>
                        <div className="font-medium">2.8s</div>
                      </div>
                      <div className="bg-muted rounded p-2">
                        <div className="text-xs text-muted-foreground">Precision</div>
                        <div className="font-medium">83.5%</div>
                      </div>
                      <div className="bg-muted rounded p-2">
                        <div className="text-xs text-muted-foreground">Recall</div>
                        <div className="font-medium">79.1%</div>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <div className="text-sm font-medium mb-1">Last Training</div>
                      <div className="text-xs text-muted-foreground">March 20, 2024</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Select Dataset</div>
                  <Select 
                    value={activeDataset} 
                    onValueChange={setActiveDataset}
                    disabled={isProcessing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="copper_deposit">Copper Deposit</SelectItem>
                      <SelectItem value="gold_vein">Gold Vein</SelectItem>
                      <SelectItem value="fault_system">Fault System</SelectItem>
                      <SelectItem value="sedimentary_basin">Sedimentary Basin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">Visualization Mode</div>
                  <Select 
                    value={visualizationMode} 
                    onValueChange={setVisualizationMode}
                    disabled={isProcessing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3d_structure">3D Structure</SelectItem>
                      <SelectItem value="mineralization">Mineralization Zones</SelectItem>
                      <SelectItem value="porosity">Porosity Gradients</SelectItem>
                      <SelectItem value="fault_lines">Fault Lines</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleRunAnalysis}
                    disabled={isProcessing || !isModelLoaded}
                    className="w-full mb-2"
                  >
                    <Cube className="mr-2 h-4 w-4" />
                    {isProcessing ? 'Processing...' : 'Run Analysis'}
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button variant="outline" onClick={handleDownloadReport}>
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                    <Button variant="outline">
                      <Settings2 className="mr-2 h-4 w-4" />
                      Advanced Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Layers3 className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                    <span className="text-sm">Creates 3D subsurface mineralization models</span>
                  </li>
                  <li className="flex items-start">
                    <Layers3 className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                    <span className="text-sm">Integrates drill hole data with geophysics</span>
                  </li>
                  <li className="flex items-start">
                    <Layers3 className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                    <span className="text-sm">Uncertainty quantification for predictions</span>
                  </li>
                  <li className="flex items-start">
                    <Layers3 className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                    <span className="text-sm">Real-time API for inference and integration</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="algorithm">Algorithm</TabsTrigger>
                <TabsTrigger value="docs">Documentation</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="p-4 bg-muted rounded-md mt-2">
                <h4 className="font-medium mb-2">Model Details</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  GeoStructure-3D is a 3D Graph Convolutional Network designed specifically for modeling complex 
                  geological structures from multiple data sources.
                </p>
                <div className="text-xs">
                  <div><span className="font-medium">Type:</span> 3D Graph Convolutional Network</div>
                  <div><span className="font-medium">Status:</span> In Development</div>
                  <div><span className="font-medium">Last Updated:</span> March 20, 2024</div>
                </div>
              </TabsContent>
              <TabsContent value="algorithm" className="p-4 bg-muted rounded-md mt-2">
                <h4 className="font-medium mb-2">Algorithm</h4>
                <p className="text-sm text-muted-foreground">
                  The model uses a 7-layer graph convolutional architecture with residual connections.
                  Each node in the graph represents a point in 3D space, with edges connecting
                  spatially adjacent points. Message passing between nodes allows for capturing
                  complex geological relationships.
                </p>
              </TabsContent>
              <TabsContent value="docs" className="p-4 bg-muted rounded-md mt-2">
                <h4 className="font-medium mb-2">Documentation</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  For full documentation on integrating GeoStructure-3D into your workflows,
                  refer to the API documentation.
                </p>
                <Button variant="link" size="sm" className="px-0">
                  View API Documentation
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoStructure3DDemo;
