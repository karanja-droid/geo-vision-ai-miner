
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";
import { AIModelCard } from './AIModelCard';

export const AIModelsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Alert variant="default" className="bg-primary/10 border-primary/20">
        <Database className="h-5 w-5" />
        <AlertTitle>Advanced AI Model Integration</AlertTitle>
        <AlertDescription>
          Leverage sophisticated deep learning models for improved geological predictions
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AIModelCard
          name="SatelliteVision CNN"
          type="Convolutional Neural Network"
          status="Production Ready"
          description="Deep learning model specialized in identifying mineral signatures from multispectral satellite imagery"
          metrics={{
            accuracy: 93.5,
            latency: 1.2,
            lastTrained: "2024-04-15"
          }}
          features={[
            "Detects subtle spectral anomalies",
            "Works with Landsat and Sentinel-2 data",
            "Transfer learning from pre-trained models",
            "Attention mechanisms for feature importance"
          ]}
          demoLink="/satellite-vision"
        />
        
        <AIModelCard
          name="GeoStructure-3D"
          type="3D Graph Convolutional Network"
          status="In Development"
          description="Advanced network for modeling 3D geological structures from drill core and seismic data"
          metrics={{
            accuracy: 87.2,
            latency: 2.8,
            lastTrained: "2024-03-20"
          }}
          features={[
            "Creates 3D subsurface mineralization models",
            "Integrates drill hole data with geophysics",
            "Uncertainty quantification",
            "API for real-time inference"
          ]}
        />
        
        <AIModelCard
          name="MineralEnsemble"
          type="Ensemble Learning System"
          status="Deployed"
          description="Hybrid model combining random forests, gradient boosting, and neural networks"
          metrics={{
            accuracy: 91.8,
            latency: 0.8,
            lastTrained: "2024-04-10"
          }}
          features={[
            "Combines multiple model predictions",
            "Handles missing data gracefully",
            "Provides confidence intervals",
            "Interpretable feature importance"
          ]}
        />
        
        <AIModelCard
          name="GeoTransformer"
          type="Transformer Neural Network"
          status="Research"
          description="Attention-based model for correlating multi-modal geological data across regions"
          metrics={{
            accuracy: 89.4,
            latency: 3.5,
            lastTrained: "2024-03-05"
          }}
          features={[
            "Long-range spatial dependencies",
            "Multi-headed attention for data fusion",
            "Self-supervised pre-training",
            "Zero-shot transfer to new regions"
          ]}
        />
      </div>

      <div className="mt-6">
        <Button className="mr-2">Deploy New Model</Button>
        <Button variant="outline">Retrain Models</Button>
      </div>
    </div>
  );
};
