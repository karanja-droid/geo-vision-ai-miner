
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Image } from "lucide-react";
import { ModelInfo } from '@/types/models';
import { AnalysisOptions } from '@/types/analysis';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import { BetaBanner } from '@/components/feedback/BetaBanner';

// Import refactored components
import ConfigurationTab from './ConfigurationTab';
import ProgressTab from './ProgressTab';
import ResultsTab from './ResultsTab';
import PlaceholderContent from './PlaceholderContent';

// Import custom hooks
import { useAnalyzerState } from './hooks/useAnalyzerState';
import { useModelAnalysis } from './hooks/useModelAnalysis';

interface SatelliteVisionAnalyzerProps {
  modelInfo?: ModelInfo;
  onAnalyze?: (options: AnalysisOptions) => void;
  selectedDataset?: string | null;
}

const defaultModelInfo: ModelInfo = {
  id: "satellite-vision-cnn-1",
  name: "SatelliteVision CNN",
  type: "computer-vision",
  target: "mineral_signatures",
  accuracy: 94.2,
  lastTrained: "2024-04-28",
  description: "Deep learning model specialized in identifying mineral signatures from multispectral satellite imagery with African deposit optimization",
  feedbackIncorporated: true,
  regionSpecialization: "africa",
  mineralTypes: ["gold", "copper", "cobalt", "diamond"]
};

const SatelliteVisionAnalyzer: React.FC<SatelliteVisionAnalyzerProps> = ({ 
  modelInfo = defaultModelInfo,
  onAnalyze,
  selectedDataset
}) => {
  // Use the custom hook for state management
  const {
    isAnalyzing,
    setIsAnalyzing,
    progress,
    setProgress,
    activeTab,
    setActiveTab,
    analysisOptions,
    analysisResults,
    setAnalysisResults,
    handleOptionChange,
    handleSpectralBandToggle,
    handleMineralTargetToggle,
    handleRegionFocusChange
  } = useAnalyzerState();

  // Use the custom hook for model analysis
  const {
    handleAnalyze: runAnalysis,
    handleDownloadReport,
    handleViewFullAnalysis,
    showMap,
    setShowMap
  } = useModelAnalysis(
    modelInfo,
    analysisOptions,
    setProgress,
    setActiveTab,
    setIsAnalyzing,
    setAnalysisResults,
    onAnalyze
  );

  // If no dataset is selected, show the placeholder
  if (!selectedDataset) {
    return <PlaceholderContent />;
  }

  const handleAnalyzeClick = () => runAnalysis(selectedDataset);

  return (
    <ErrorBoundary>
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5 text-primary" />
                {modelInfo.name}
                {modelInfo.regionSpecialization === 'africa' && (
                  <Badge className="bg-amber-600 text-white text-xs">Africa Optimized</Badge>
                )}
              </CardTitle>
              <CardDescription>{modelInfo.description}</CardDescription>
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
              {modelInfo.accuracy.toFixed(1)}% Accuracy
            </Badge>
          </div>
          
          <BetaBanner show={true} className="mt-4" />
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
              <TabsTrigger value="progress" disabled={!isAnalyzing && activeTab !== "progress"}>Analysis</TabsTrigger>
              <TabsTrigger value="results" disabled={isAnalyzing || (activeTab !== "results" && progress < 100)}>Results</TabsTrigger>
            </TabsList>
            
            {/* Configuration Tab */}
            <TabsContent value="configuration">
              <ConfigurationTab 
                analysisOptions={analysisOptions}
                handleOptionChange={handleOptionChange}
                handleSpectralBandToggle={handleSpectralBandToggle}
                handleMineralTargetToggle={handleMineralTargetToggle}
                handleRegionFocusChange={handleRegionFocusChange}
                modelInfo={modelInfo}
              />
            </TabsContent>
            
            {/* Analysis Progress Tab */}
            <TabsContent value="progress">
              <ProgressTab progress={progress} />
            </TabsContent>
            
            {/* Results Tab */}
            <TabsContent value="results">
              <ResultsTab 
                analysisResults={analysisResults}
                handleDownloadReport={handleDownloadReport}
                handleViewFullAnalysis={handleViewFullAnalysis}
                showMap={showMap}
                setShowMap={setShowMap}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          {activeTab === "configuration" && (
            <Button 
              onClick={handleAnalyzeClick} 
              className="w-full"
              disabled={isAnalyzing || analysisOptions.spectralBands.length === 0}
            >
              Run Satellite Vision Analysis
            </Button>
          )}
          
          {activeTab === "results" && (
            <Button 
              onClick={() => setActiveTab("configuration")} 
              variant="outline"
              className="w-full"
            >
              Configure New Analysis
            </Button>
          )}
        </CardFooter>
      </Card>
    </ErrorBoundary>
  );
};

export default SatelliteVisionAnalyzer;
