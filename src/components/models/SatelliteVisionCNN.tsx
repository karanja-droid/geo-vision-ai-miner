
import React from 'react';
import SatelliteVisionAnalyzer from './satellite-vision/SatelliteVisionAnalyzer';
import { ModelInfo } from '@/types/models';
import { AnalysisOptions } from '@/types/analysis';

interface SatelliteVisionCNNProps {
  modelInfo?: ModelInfo;
  onAnalyze?: (options: AnalysisOptions) => void;
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
