
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";
import { AIModelCard } from './AIModelCard';
import { Link } from 'react-router-dom';

export const AIModelsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Alert variant="default" className="bg-primary/10 border-primary/20">
        <Database className="h-5 w-5" />
        <AlertTitle>Advanced AI Model Integration</AlertTitle>
        <AlertDescription>
          Leverage sophisticated deep learning models for improved geological predictions and African mineral deposits
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AIModelCard
          name="SatelliteVision CNN"
          type="Convolutional Neural Network"
          status="Production Ready"
          description="Deep learning model specialized in identifying mineral signatures from multispectral satellite imagery with African deposit optimization"
          metrics={{
            accuracy: 94.2,
            latency: 1.2,
            lastTrained: "2024-04-28"
          }}
          features={[
            "African terrain and deposit signature optimization",
            "Specialized gold and copper-cobalt detection",
            "Works with Landsat and Sentinel-2 data",
            "Transfer learning from pre-trained models",
            "Attention mechanisms for feature importance"
          ]}
          demoLink="/satellite-vision"
          regionSpecialization="africa"
          mineralTypes={["gold", "copper", "cobalt", "diamond"]}
        />
        
        <AIModelCard
          name="GeoStructure-3D"
          type="3D Graph Convolutional Network"
          status="In Development"
          description="Advanced network for modeling 3D geological structures from drill core and seismic data with African deposit characteristics"
          metrics={{
            accuracy: 89.5,
            latency: 2.5,
            lastTrained: "2024-04-10"
          }}
          features={[
            "Creates 3D subsurface mineralization models",
            "African geological formation specialization",
            "Integrates drill hole data with geophysics",
            "Diamond kimberlite pipe detection enhancements",
            "API for real-time inference"
          ]}
          demoLink="/geostructure-3d"
          regionSpecialization="africa"
          mineralTypes={["diamond", "gold", "platinum"]}
        />
        
        <AIModelCard
          name="MineralEnsemble"
          type="Ensemble Learning System"
          status="Deployed"
          description="Hybrid model combining random forests, gradient boosting, and neural networks with West African deposit calibration"
          metrics={{
            accuracy: 93.4,
            latency: 0.8,
            lastTrained: "2024-04-25"
          }}
          features={[
            "Optimized for West African gold and copper belt",
            "Combines multiple model predictions",
            "Handles missing data gracefully",
            "Provides confidence intervals",
            "Interpretable feature importance"
          ]}
          regionSpecialization="africa"
          mineralTypes={["gold", "copper", "iron", "manganese"]}
        />
        
        <AIModelCard
          name="GeoTransformer"
          type="Transformer Neural Network"
          status="Research"
          description="Attention-based model for correlating multi-modal geological data across regions with African deposit type optimization"
          metrics={{
            accuracy: 91.7,
            latency: 3.2,
            lastTrained: "2024-04-15"
          }}
          features={[
            "Long-range spatial dependencies",
            "Trained on Central and Southern African mineral deposits",
            "Multi-headed attention for data fusion",
            "Self-supervised pre-training on African geological surveys",
            "Zero-shot transfer to new regions"
          ]}
          regionSpecialization="africa"
          mineralTypes={["lithium", "cobalt", "diamond", "zinc"]}
        />
      </div>

      <div className="mt-6">
        <Button className="mr-2">Deploy New Model</Button>
        <Button variant="outline">Retrain African Models</Button>
      </div>
    </div>
  );
};
