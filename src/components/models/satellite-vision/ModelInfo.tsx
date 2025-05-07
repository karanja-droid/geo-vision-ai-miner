
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Activity, MapPin } from "lucide-react";
import { ModelInfo } from '@/types/models';
import { Badge } from '@/components/ui/badge';

interface ModelInfoProps {
  modelInfo: ModelInfo;
}

const ModelInfoAlert: React.FC<ModelInfoProps> = ({ modelInfo }) => {
  const hasAfricanSpecialization = modelInfo.regionSpecialization === 'africa';
  
  return (
    <Alert variant="default" className="bg-muted/50 border-muted">
      <Activity className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-2">
        Model Information
        {hasAfricanSpecialization && (
          <Badge className="bg-amber-600 text-white text-xs">Africa Optimized</Badge>
        )}
      </AlertTitle>
      <AlertDescription>
        <ul className="text-sm space-y-1 list-disc pl-5 mt-2">
          <li>Last Trained: {new Date(modelInfo.lastTrained).toLocaleDateString()}</li>
          <li>Model Type: Convolutional Neural Network</li>
          <li>Target Features: Mineral signatures in multispectral imagery</li>
          {hasAfricanSpecialization && (
            <li>Regional Focus: Optimized for African geological contexts</li>
          )}
          {modelInfo.mineralTypes?.length > 0 && (
            <li>Target Deposits: {modelInfo.mineralTypes.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ')}</li>
          )}
          <li>Uses attention mechanisms for feature importance</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default ModelInfoAlert;
