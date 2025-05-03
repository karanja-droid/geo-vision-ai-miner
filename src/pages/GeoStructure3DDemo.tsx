
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Box, Layers3, Settings2, FileAxis3d, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import GeoStructure3DVisualization from '@/components/models/GeoStructure3DVisualization';
import ModelControls from '@/components/models/geo-demo/ModelControls';
import StructureInterpretation from '@/components/models/geo-demo/StructureInterpretation';
import ModelPerformance from '@/components/models/geo-demo/ModelPerformance';
import KeyFeatures from '@/components/models/geo-demo/KeyFeatures';
import InfoTabs from '@/components/models/geo-demo/InfoTabs';

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
            <div className="h-[600px] overflow-hidden bg-card rounded-lg border shadow-sm">
              <div className="p-6 pb-2">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">3D Visualization</h3>
                <p className="text-sm text-muted-foreground">
                  Interactive subsurface visualization using GeoStructure-3D model
                </p>
              </div>
              <div className="p-0 h-[520px]">
                <GeoStructure3DVisualization 
                  dataset={activeDataset} 
                  visualizationMode={visualizationMode}
                  isLoading={!isModelLoaded || isProcessing}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StructureInterpretation />
              <ModelPerformance />
            </div>
          </div>
          
          <div className="space-y-6">
            <ModelControls
              activeDataset={activeDataset}
              setActiveDataset={setActiveDataset}
              visualizationMode={visualizationMode}
              setVisualizationMode={setVisualizationMode}
              isProcessing={isProcessing}
              isModelLoaded={isModelLoaded}
              onRunAnalysis={handleRunAnalysis}
              onDownloadReport={handleDownloadReport}
            />
            
            <KeyFeatures />
            
            <InfoTabs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoStructure3DDemo;
