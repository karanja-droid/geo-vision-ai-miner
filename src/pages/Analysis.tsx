
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { DatasetInfo } from '@/types';
import { AnalysisResult } from '@/types/analysis';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Settings, PlayCircle, BarChart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Analysis: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<DatasetInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('configure');
  const [progress, setProgress] = useState<number>(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisConfig, setAnalysisConfig] = useState({
    deepLearning: true,
    sensitivity: 70,
    useHistoricalData: true,
    mineralFocus: 'all', // 'gold', 'copper', 'all'
    resolution: 'medium', // 'low', 'medium', 'high'
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  // Load selected dataset from localStorage on component mount
  useEffect(() => {
    const storedDataset = localStorage.getItem('selectedDatasetForAnalysis');
    if (storedDataset) {
      setSelectedDataset(JSON.parse(storedDataset));
    } else {
      toast({
        title: "No dataset selected",
        description: "Please select a dataset from the library first.",
        variant: "destructive",
      });
      navigate('/dataset-management');
    }
  }, [navigate, toast]);

  // Handle analysis config changes
  const handleConfigChange = (key: string, value: any) => {
    setAnalysisConfig(prev => ({ ...prev, [key]: value }));
  };

  // Simulated analysis processing
  const handleStartAnalysis = () => {
    setIsLoading(true);
    setProgress(0);
    setActiveTab('processing');

    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          // Once complete, move to results
          setTimeout(() => {
            setIsLoading(false);
            setActiveTab('results');
            generateAnalysisResult();

            toast({
              title: "Analysis Complete",
              description: "Your dataset has been successfully analyzed.",
            });
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  // Generate simulated analysis result
  const generateAnalysisResult = () => {
    const result: AnalysisResult = {
      id: `analysis-${Date.now()}`,
      datasetId: selectedDataset?.id || 'unknown',
      timestamp: new Date().toISOString(),
      confidence: analysisConfig.sensitivity / 100 * 0.9 + 0.05,
      mineralType: analysisConfig.mineralFocus === 'all' ? 'mixed' : analysisConfig.mineralFocus,
      data: {
        anomalies: Math.floor(Math.random() * 15) + 2,
        coverage: `${Math.floor(Math.random() * 40) + 60}%`,
        insights: [
          "High probability mineral deposits detected in northwest region",
          "Geological formations consistent with historical mining activities",
          "Several potential exploration targets identified with moderate confidence"
        ],
        hotspots: [
          { id: 1, lat: -12.8282, lng: 28.2263, strength: 0.82 },
          { id: 2, lat: -12.9718, lng: 28.6368, strength: 0.75 },
          { id: 3, lat: -13.1126, lng: 28.1559, strength: 0.91 },
        ]
      }
    };

    // Save to localStorage for other components to access
    localStorage.setItem('latestAnalysisResult', JSON.stringify(result));
    setAnalysisResult(result);
  };

  const handleViewOnMap = () => {
    navigate('/interactive-map');
    toast({
      title: "Results Loaded on Map",
      description: "Analysis results have been loaded on the interactive map.",
    });
  };

  if (!selectedDataset) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardContent className="flex items-center justify-center p-6">
            <p>Loading dataset information...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Dataset Analysis</h1>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Configure and run geological data analysis
          </p>
          <div className="bg-secondary/30 px-3 py-1 rounded-full text-sm">
            Analyzing: {selectedDataset.name}
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="configure" disabled={isLoading}>
            <Settings className="h-4 w-4 mr-2" /> Configure
          </TabsTrigger>
          <TabsTrigger value="processing" disabled={!isLoading}>
            <PlayCircle className="h-4 w-4 mr-2" /> Processing
          </TabsTrigger>
          <TabsTrigger value="results" disabled={!analysisResult}>
            <BarChart className="h-4 w-4 mr-2" /> Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="configure">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" htmlFor="deep-learning">
                    Enable Deep Learning Model
                  </label>
                  <Switch
                    id="deep-learning"
                    checked={analysisConfig.deepLearning}
                    onCheckedChange={(checked) => handleConfigChange('deepLearning', checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Use advanced neural networks for geological pattern recognition
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sensitivity</label>
                <div className="pt-2">
                  <Slider
                    value={[analysisConfig.sensitivity]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleConfigChange('sensitivity', value[0])}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Lower (fewer false positives)</span>
                  <span>{analysisConfig.sensitivity}%</span>
                  <span>Higher (more potential sites)</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" htmlFor="historical-data">
                    Include Historical Data
                  </label>
                  <Switch
                    id="historical-data"
                    checked={analysisConfig.useHistoricalData}
                    onCheckedChange={(checked) => handleConfigChange('useHistoricalData', checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Incorporate historical mining and geological survey data
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Mineral Focus</label>
                <div className="flex space-x-2">
                  {['all', 'gold', 'copper'].map((mineral) => (
                    <Button
                      key={mineral}
                      variant={analysisConfig.mineralFocus === mineral ? "default" : "outline"}
                      onClick={() => handleConfigChange('mineralFocus', mineral)}
                      className="flex-1"
                    >
                      {mineral.charAt(0).toUpperCase() + mineral.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Processing Resolution</label>
                <div className="flex space-x-2">
                  {['low', 'medium', 'high'].map((resolution) => (
                    <Button
                      key={resolution}
                      variant={analysisConfig.resolution === resolution ? "default" : "outline"}
                      onClick={() => handleConfigChange('resolution', resolution)}
                      className="flex-1"
                    >
                      {resolution.charAt(0).toUpperCase() + resolution.slice(1)}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Higher resolution requires more processing time
                </p>
              </div>

              <Button
                onClick={handleStartAnalysis}
                className="w-full"
              >
                Start Analysis
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing">
          <Card>
            <CardHeader>
              <CardTitle>Analysis in Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-secondary/30 h-4 w-full rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-center">
                <p className="font-medium">{progress}% Complete</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {progress < 30 && "Preparing dataset and initializing models..."}
                  {progress >= 30 && progress < 70 && "Processing geological patterns and identifying anomalies..."}
                  {progress >= 70 && progress < 100 && "Finalizing analysis and generating visualizations..."}
                  {progress === 100 && "Analysis complete! Preparing results..."}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {analysisResult ? (
                <>
                  <Alert className="bg-green-500/10 border-green-200">
                    <AlertCircle className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-700">Analysis Successful</AlertTitle>
                    <AlertDescription>
                      {analysisResult.data.anomalies} potential anomalies detected with {(analysisResult.confidence * 100).toFixed(1)}% confidence
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-secondary/30 p-4 rounded-lg">
                      <div className="text-sm font-medium">Anomalies</div>
                      <div className="text-2xl font-bold mt-1">{analysisResult.data.anomalies}</div>
                    </div>
                    <div className="bg-secondary/30 p-4 rounded-lg">
                      <div className="text-sm font-medium">Confidence</div>
                      <div className="text-2xl font-bold mt-1">{(analysisResult.confidence * 100).toFixed(1)}%</div>
                    </div>
                    <div className="bg-secondary/30 p-4 rounded-lg">
                      <div className="text-sm font-medium">Coverage</div>
                      <div className="text-2xl font-bold mt-1">{analysisResult.data.coverage}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-medium">Key Insights</div>
                    <ul className="list-disc pl-5 space-y-1">
                      {analysisResult.data.insights.map((insight, index) => (
                        <li key={index} className="text-sm">{insight}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 flex flex-col md:flex-row gap-3">
                    <Button onClick={handleViewOnMap} className="flex-1">
                      View Results on Map
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Download Complete Report
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full rounded-md" />
                  <div className="grid grid-cols-3 gap-4">
                    <Skeleton className="h-24 w-full rounded-md" />
                    <Skeleton className="h-24 w-full rounded-md" />
                    <Skeleton className="h-24 w-full rounded-md" />
                  </div>
                  <Skeleton className="h-32 w-full rounded-md" />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analysis;
