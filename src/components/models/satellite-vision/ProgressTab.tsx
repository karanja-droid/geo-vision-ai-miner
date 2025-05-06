
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Database, Layers, BarChart } from "lucide-react";

interface ProgressTabProps {
  progress: number;
}

const ProgressTab: React.FC<ProgressTabProps> = ({ progress }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Analyzing satellite imagery</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} />
      </div>
      
      <div className="space-y-2">
        {progress > 10 && (
          <Alert variant="default" className="bg-muted/30">
            <Database className="h-4 w-4" />
            <AlertTitle>Processing Data</AlertTitle>
            <AlertDescription>
              Preprocessing satellite imagery and calibrating spectral bands...
            </AlertDescription>
          </Alert>
        )}
        
        {progress > 40 && (
          <Alert variant="default" className="bg-muted/30">
            <Layers className="h-4 w-4" />
            <AlertTitle>Feature Extraction</AlertTitle>
            <AlertDescription>
              Extracting spectral signatures and analyzing patterns...
            </AlertDescription>
          </Alert>
        )}
        
        {progress > 70 && (
          <Alert variant="default" className="bg-muted/30">
            <BarChart className="h-4 w-4" />
            <AlertTitle>Classification</AlertTitle>
            <AlertDescription>
              Classifying mineral signatures and generating prediction maps...
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default ProgressTab;
