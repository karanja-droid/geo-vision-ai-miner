import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Image } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ModelInfo } from '@/types/models';

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
}

const defaultModelInfo: ModelInfo = {
  id: "satellite-vision-cnn-1",
  name: "SatelliteVision CNN",
  type: "computer-vision",
  target: "mineral_signatures",
  accuracy: 93.5,
  lastTrained: "2024-04-15",
  description: "Deep learning model specialized in identifying mineral signatures from multispectral satellite imagery",
  feedbackIncorporated: true
};

const SatelliteVisionAnalyzer: React.FC<SatelliteVisionAnalyzerProps> = ({ 
  modelInfo = defaultModelInfo,
  onAnalyze,
  selectedDataset
}) => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("configuration");
  const [analysisOptions, setAnalysisOptions] = useState<AnalysisOptions>({
    dataSource: "landsat-8",
    resolution: "medium",
    depth: "shallow",
    spectralBands: ["visible", "near-ir"]
  });
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setProgress(0);
    setActiveTab("progress");
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setActiveTab("results");
            generateAnalysisResults();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 800);
    
    // Call the onAnalyze callback if provided
    if (onAnalyze) {
      onAnalyze(analysisOptions);
    }
  };

  const generateAnalysisResults = () => {
    // Simulate generating analysis results based on the options
    const results = {
      timestamp: new Date().toISOString(),
      options: { ...analysisOptions },
      minerals: {
        ironOxide: Math.round(60 + Math.random() * 30),
        copperSulfide: Math.round(40 + Math.random() * 30),
        silicates: Math.round(30 + Math.random() * 30)
      },
      statistics: {
        areaAnalyzed: (10 + Math.random() * 5).toFixed(1),
        anomaliesDetected: Math.round(5 + Math.random() * 5),
        featurePoints: Math.round(150 + Math.random() * 100),
        confidenceScore: (85 + Math.random() * 10).toFixed(1)
      },
      hotspots: Array.from({ length: 5 + Math.floor(Math.random() * 5) }, (_, i) => ({
        id: i + 1,
        lat: -12.5 + (Math.random() * 25), // Southern Africa latitude range
        lng: 20 + (Math.random() * 15),    // Southern Africa longitude range
        strength: 0.7 + (Math.random() * 0.3)
      }))
    };
    
    setAnalysisResults(results);
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
      // Create a formatted text report
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

MINERAL DETECTION RESULTS
------------------------
Iron Oxide: ${analysisResults.minerals.ironOxide}%
Copper Sulfide: ${analysisResults.minerals.copperSulfide}%
Silicates: ${analysisResults.minerals.silicates}%

STATISTICS
---------
Area Analyzed: ${analysisResults.statistics.areaAnalyzed} km²
Anomalies Detected: ${analysisResults.statistics.anomaliesDetected}
Feature Points: ${analysisResults.statistics.featurePoints}
Confidence Score: ${analysisResults.statistics.confidenceScore}%

HOTSPOTS
-------
${analysisResults.hotspots.map((hotspot: any) => 
  `ID: ${hotspot.id}, Location: [${hotspot.lat.toFixed(6)}, ${hotspot.lng.toFixed(6)}], Strength: ${(hotspot.strength * 100).toFixed(1)}%`
).join('\n')}

NOTES
-----
This report was generated using SatelliteVision CNN model (${modelInfo.id}).
Model accuracy: ${modelInfo.accuracy}%
Last trained: ${new Date(modelInfo.lastTrained).toLocaleDateString()}
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
  );
};

export default SatelliteVisionAnalyzer;
