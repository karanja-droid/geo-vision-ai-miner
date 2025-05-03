
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Layers, Image, Database, BarChart, Activity } from "lucide-react";
import { ModelInfo } from '@/types/models';

interface SatelliteVisionCNNProps {
  modelInfo?: ModelInfo;
  onAnalyze?: (options: AnalysisOptions) => void;
}

interface AnalysisOptions {
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

const SatelliteVisionCNN: React.FC<SatelliteVisionCNNProps> = ({ 
  modelInfo = defaultModelInfo,
  onAnalyze 
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("configuration");
  const [analysisOptions, setAnalysisOptions] = useState<AnalysisOptions>({
    dataSource: "landsat-8",
    resolution: "medium",
    depth: "shallow",
    spectralBands: ["visible", "near-ir"]
  });

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
          <TabsContent value="configuration" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Data Source</label>
                <Select 
                  value={analysisOptions.dataSource}
                  onValueChange={(value) => handleOptionChange("dataSource", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select data source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="landsat-8">Landsat 8</SelectItem>
                    <SelectItem value="landsat-9">Landsat 9</SelectItem>
                    <SelectItem value="sentinel-2">Sentinel-2</SelectItem>
                    <SelectItem value="worldview-3">WorldView-3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Resolution</label>
                <Select 
                  value={analysisOptions.resolution}
                  onValueChange={(value) => handleOptionChange("resolution", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select resolution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (30m)</SelectItem>
                    <SelectItem value="medium">Medium (15m)</SelectItem>
                    <SelectItem value="high">High (5m)</SelectItem>
                    <SelectItem value="very-high">Very High (1m)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Analysis Depth</label>
                <Select 
                  value={analysisOptions.depth}
                  onValueChange={(value) => handleOptionChange("depth", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select analysis depth" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shallow">Shallow (Fast)</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="deep">Deep (Comprehensive)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Spectral Bands</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["visible", "near-ir", "short-ir", "thermal-ir", "red-edge"].map(band => (
                    <Badge 
                      key={band}
                      variant={analysisOptions.spectralBands.includes(band) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleSpectralBandToggle(band)}
                    >
                      {band}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
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
          </TabsContent>
          
          {/* Analysis Progress Tab */}
          <TabsContent value="progress" className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analyzing satellite imagery</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
            
            <div className="space-y-2">
              {progress > 10 && (
                <Alert variant="default" className="bg-muted/30">
                  <Database className="h-4 w-4" />
                  <AlertTitle>Processing Data</AlertTitle>
                  <AlertDescription>
                    Preprocessing satellite imagery and calibrating spectral bands...
                  </AlertDescription>
                </Alert>
              )}
              
              {progress > 40 && (
                <Alert variant="default" className="bg-muted/30">
                  <Layers className="h-4 w-4" />
                  <AlertTitle>Feature Extraction</AlertTitle>
                  <AlertDescription>
                    Extracting spectral signatures and analyzing patterns...
                  </AlertDescription>
                </Alert>
              )}
              
              {progress > 70 && (
                <Alert variant="default" className="bg-muted/30">
                  <BarChart className="h-4 w-4" />
                  <AlertTitle>Classification</AlertTitle>
                  <AlertDescription>
                    Classifying mineral signatures and generating prediction maps...
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>
          
          {/* Results Tab */}
          <TabsContent value="results" className="space-y-4">
            <Alert variant="default" className="bg-green-500/10 border-green-200">
              <Activity className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-700">Analysis Complete</AlertTitle>
              <AlertDescription>
                SatelliteVision CNN has successfully analyzed the selected imagery.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Detected Minerals</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Iron Oxide</span>
                    <span className="font-medium">86%</span>
                  </div>
                  <Progress value={86} className="h-1.5" />
                  
                  <div className="flex justify-between">
                    <span>Copper Sulfide</span>
                    <span className="font-medium">62%</span>
                  </div>
                  <Progress value={62} className="h-1.5" />
                  
                  <div className="flex justify-between">
                    <span>Silicates</span>
                    <span className="font-medium">41%</span>
                  </div>
                  <Progress value={41} className="h-1.5" />
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Coverage Statistics</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span>Area Analyzed:</span>
                    <span>12.8 km²</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Anomalies Detected:</span>
                    <span>7</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Feature Points:</span>
                    <span>214</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Confidence Score:</span>
                    <span className="font-medium text-green-600">92.7%</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline">Download Report</Button>
              <Button>View Full Analysis</Button>
            </div>
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

export default SatelliteVisionCNN;
