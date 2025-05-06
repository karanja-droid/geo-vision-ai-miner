
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Activity } from "lucide-react";
import { ModelInfo } from '@/types/models';

interface ModelInfoProps {
  modelInfo: ModelInfo;
}

const ModelInfoAlert: React.FC<ModelInfoProps> = ({ modelInfo }) => {
  return (
    <Alert variant="default" className="bg-muted/50 border-muted">
      <Activity className="h-4 w-4" />
      <AlertTitle>Model Information</AlertTitle>
      <AlertDescription>
        <ul className="text-sm space-y-1 list-disc pl-5 mt-2">
          <li>Last Trained: {new Date(modelInfo.lastTrained).toLocaleDateString()}</li>
          <li>Model Type: Convolutional Neural Network</li>
          <li>Target Features: Mineral signatures in multispectral imagery</li>
          <li>Uses attention mechanisms for feature importance</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default ModelInfoAlert;
