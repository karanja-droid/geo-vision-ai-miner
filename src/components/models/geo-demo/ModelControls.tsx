
import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Box, Download, Settings2 } from "lucide-react";

interface ModelControlsProps {
  activeDataset: string;
  setActiveDataset: (dataset: string) => void;
  visualizationMode: string;
  setVisualizationMode: (mode: string) => void;
  isProcessing: boolean;
  isModelLoaded: boolean;
  onRunAnalysis: () => void;
  onDownloadReport: () => void;
}

const ModelControls: React.FC<ModelControlsProps> = ({
  activeDataset,
  setActiveDataset,
  visualizationMode,
  setVisualizationMode,
  isProcessing,
  isModelLoaded,
  onRunAnalysis,
  onDownloadReport
}) => {
  return (
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
            onClick={onRunAnalysis}
            disabled={isProcessing || !isModelLoaded}
            className="w-full mb-2"
          >
            <Box className="mr-2 h-4 w-4" />
            {isProcessing ? 'Processing...' : 'Run Analysis'}
          </Button>
          
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button variant="outline" onClick={onDownloadReport}>
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
  );
};

export default ModelControls;
