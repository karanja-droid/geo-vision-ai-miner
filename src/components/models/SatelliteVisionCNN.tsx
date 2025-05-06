
import React from 'react';
import SatelliteVisionAnalyzer from './satellite-vision/SatelliteVisionAnalyzer';
import { ModelInfo } from '@/types/models';

interface SatelliteVisionCNNProps {
  modelInfo?: ModelInfo;
  onAnalyze?: (options: any) => void;
  selectedDataset?: string | null;
}

const SatelliteVisionCNN: React.FC<SatelliteVisionCNNProps> = ({ 
  modelInfo,
  onAnalyze,
  selectedDataset
}) => {
  return (
    <SatelliteVisionAnalyzer
      modelInfo={modelInfo}
      onAnalyze={onAnalyze}
      selectedDataset={selectedDataset}
    />
  );
};

export default SatelliteVisionCNN;
