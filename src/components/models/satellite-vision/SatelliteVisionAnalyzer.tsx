import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Image, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ModelInfo } from '@/types/models';
import { useAnalysis } from '@/hooks/database';
import { AnalysisOptions, AnalysisResult } from '@/types/analysis';

// Import refactored components
import ConfigurationTab from './ConfigurationTab';
import ProgressTab from './ProgressTab';
import ResultsTab from './ResultsTab';
import PlaceholderContent from './PlaceholderContent';

interface SatelliteVisionAnalyzerProps {
  modelInfo?: ModelInfo;
  onAnalyze?: (options: AnalysisOptions) => void;
  selectedDataset?: string | null;
}

export interface AnalysisOptions {
  dataSource: string;
  resolution: string;
  depth: string;
  spectralBands: string[];
  regionFocus?: string;
  targetMinerals?: string[];
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
  const { toast } = useToast();
  const { runModelAnalysis, loading } = useAnalysis();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("configuration");
  const [analysisOptions, setAnalysisOptions] = useState<AnalysisOptions>({
    dataSource: "landsat-8",
    resolution: "medium",
    depth: "shallow",
    spectralBands: ["visible", "near-ir"],
    regionFocus: "africa",
    targetMinerals: ["gold", "copper"]
  });
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    setActiveTab("progress");
    
    // Simulate initial progress while backend prepares
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 10;
      });
    }, 800);
    
    try {
      // Call the backend analysis endpoint
      const datasetId = selectedDataset || 'demo-dataset-001';
      
      // Convert our options to the expected format
      const backendOptions: import('@/types/analysis').AnalysisOptions = {
        dataSource: analysisOptions.dataSource,
        resolution: analysisOptions.resolution,
        depth: analysisOptions.depth,
        spectralBands: analysisOptions.spectralBands,
        regionFocus: analysisOptions.regionFocus,
        targetMinerals: analysisOptions.targetMinerals,
        deepLearning: true // Satellite vision always uses deep learning
      };
      
      // Run the analysis through our backend
      const result = await runModelAnalysis(
        datasetId, 
        modelInfo.id, 
        backendOptions
      );
      
      // Process the results
      if (result) {
        setAnalysisResults({
          timestamp: result.timestamp,
          options: analysisOptions,
          minerals: {
            ironOxide: Math.round(result.data.spectralAnalysis?.['visible']?.strength * 100) || 60,
            copperSulfide: Math.round(result.data.spectralAnalysis?.['near-ir']?.strength * 100) || 40,
            silicates: Math.round(result.data.spectralAnalysis?.['short-ir']?.strength * 100) || 30,
            goldIndicators: Math.round(result.data.spectralAnalysis?.['thermal']?.strength * 100) || 20,
            diamondIndicators: Math.round(result.data.spectralAnalysis?.['ultraviolet']?.strength * 100) || 10
          },
          statistics: {
            areaAnalyzed: result.data.coverage?.analyzed?.toFixed(1) || "10.0",
            anomaliesDetected: result.data.anomalies || 5,
            featurePoints: result.data.featureCount || 150,
            confidenceScore: (result.confidence * 100).toFixed(1)
          },
          hotspots: result.data.hotspots || []
        });
      }
      
      // Clear the interval and complete the progress
      clearInterval(progressInterval);
      setProgress(100);
      
      // Switch to results tab after completion
      setTimeout(() => {
        setIsAnalyzing(false);
        setActiveTab("results");
      }, 500);
      
    } catch (error) {
      console.error("Analysis failed:", error);
      clearInterval(progressInterval);
      setIsAnalyzing(false);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    }
    
    // Call the onAnalyze callback if provided
    if (onAnalyze) {
      onAnalyze(analysisOptions);
    }
  };

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

  const handleDownloadReport = () => {
    if (!analysisResults) {
      toast({
        title: "No analysis results available",
        description: "Run an analysis first to generate a downloadable report.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Add African deposit specific details to the report
      const report = `
SATELLITE VISION CNN ANALYSIS REPORT
===================================
Generated: ${new Date().toLocaleString()}

ANALYSIS PARAMETERS
------------------
Data Source: ${analysisResults.options.dataSource}
Resolution: ${analysisResults.options.resolution}
Analysis Depth: ${analysisResults.options.depth}
Spectral Bands: ${analysisResults.options.spectralBands.join(', ')}
Region Focus: ${analysisResults.options.regionFocus || 'Global'}
Target Minerals: ${analysisResults.options.targetMinerals?.join(', ') || 'All'}

MINERAL DETECTION RESULTS
------------------------
Iron Oxide: ${analysisResults.minerals.ironOxide}%
Copper Sulfide: ${analysisResults.minerals.copperSulfide}%
Silicates: ${analysisResults.minerals.silicates}%
Gold Indicators: ${analysisResults.minerals.goldIndicators || '0'}%
Diamond Indicators: ${analysisResults.minerals.diamondIndicators || '0'}%

STATISTICS
---------
Area Analyzed: ${analysisResults.statistics.areaAnalyzed} km²
Anomalies Detected: ${analysisResults.statistics.anomaliesDetected}
Feature Points: ${analysisResults.statistics.featurePoints}
Confidence Score: ${analysisResults.statistics.confidenceScore}%
African Context Confidence: ${analysisResults.statistics.africanConfidence || analysisResults.statistics.confidenceScore}%

HOTSPOTS
-------
${analysisResults.hotspots.map((hotspot: any) => 
  `ID: ${hotspot.id}, Location: [${hotspot.lat.toFixed(6)}, ${hotspot.lng.toFixed(6)}], Strength: ${(hotspot.strength * 100).toFixed(1)}%, Likely Mineral: ${hotspot.mineralType || 'Unknown'}`
).join('\n')}

NOTES
-----
This report was generated using SatelliteVision CNN model (${modelInfo.id}).
Model accuracy: ${modelInfo.accuracy}%
Last trained: ${new Date(modelInfo.lastTrained).toLocaleDateString()}
Regional specialization: ${modelInfo.regionSpecialization || 'Global'}
`;
      
      // Create file and trigger download
      const blob = new Blob([report], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `satellite-vision-report-${new Date().getTime()}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Report downloaded",
        description: "The analysis report has been downloaded successfully.",
      });
    } catch (error) {
      console.error("Failed to download report:", error);
      toast({
        title: "Download failed",
        description: "There was a problem generating your report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewFullAnalysis = () => {
    if (!analysisResults) {
      toast({
        title: "No analysis results available",
        description: "Run an analysis first to view the full results.",
        variant: "destructive",
      });
      return;
    }
    
    // This no longer opens an alert - the map visualization is shown in the component
    console.log("Displaying full analysis with map visualization", analysisResults);
  };

  // If no dataset is selected, show the placeholder
  if (!selectedDataset) {
    return <PlaceholderContent />;
  }

  return (
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
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        {activeTab === "configuration" && (
          <Button 
            onClick={handleAnalyze} 
            className="w-full"
            disabled={isAnalyzing || analysisOptions.spectralBands.length === 0 || loading}
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
  );
};

export default SatelliteVisionAnalyzer;
