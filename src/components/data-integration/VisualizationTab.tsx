
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Globe } from "lucide-react";
import { GlobalDataVisualization } from "@/components/GlobalDataVisualization";

export const VisualizationTab: React.FC = () => {
  return (
    <>
      <Alert variant="default" className="mb-6 bg-primary/10 border-primary/20">
        <Globe className="h-5 w-5" />
        <AlertTitle>Global Data Visualization</AlertTitle>
        <AlertDescription>
          Interactive visualization of integrated geological datasets from around the world
        </AlertDescription>
      </Alert>
      
      <GlobalDataVisualization />
    </>
  );
};
