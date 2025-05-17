
import { useState } from 'react';
import { AnalysisOptions, AnalysisResult } from '@/types/analysis';

// Default analysis options
const defaultAnalysisOptions: AnalysisOptions = {
  dataSource: "landsat-8",
  resolution: "medium",
  depth: "shallow",
  spectralBands: ["visible", "near-ir"],
  regionFocus: "africa",
  targetMinerals: ["gold", "copper"]
};

export const useAnalyzerState = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("configuration");
  const [analysisOptions, setAnalysisOptions] = useState<AnalysisOptions>(defaultAnalysisOptions);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const handleOptionChange = (key: keyof AnalysisOptions, value: any) => {
    setAnalysisOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleSpectralBandToggle = (band: string) => {
    setAnalysisOptions(prev => {
      const currentBands = [...prev.spectralBands];
      if (currentBands.includes(band)) {
        return { ...prev, spectralBands: currentBands.filter(b => b !== band) };
      } else {
        return { ...prev, spectralBands: [...currentBands, band] };
      }
    });
  };

  const handleMineralTargetToggle = (mineral: string) => {
    setAnalysisOptions(prev => {
      const currentTargets = prev.targetMinerals || [];
      if (currentTargets.includes(mineral)) {
        return { ...prev, targetMinerals: currentTargets.filter(m => m !== mineral) };
      } else {
        return { ...prev, targetMinerals: [...currentTargets, mineral] };
      }
    });
  };

  const handleRegionFocusChange = (region: string) => {
    setAnalysisOptions(prev => ({ ...prev, regionFocus: region }));
  };

  return {
    isAnalyzing,
    setIsAnalyzing,
    progress,
    setProgress,
    activeTab,
    setActiveTab,
    analysisOptions,
    setAnalysisOptions,
    analysisResults,
    setAnalysisResults,
    handleOptionChange,
    handleSpectralBandToggle,
    handleMineralTargetToggle,
    handleRegionFocusChange
  };
};
