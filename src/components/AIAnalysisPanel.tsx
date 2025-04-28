
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, TrendingUp, Layers } from "lucide-react";
import { ModelInfo } from '@/types';

// Mock models
const initialModels: ModelInfo[] = [
  {
    id: '1',
    name: 'CopperDetect v2',
    type: 'predictive',
    target: 'copper',
    accuracy: 0.87,
    lastTrained: '2023-11-18',
    description: 'Predicts copper deposits based on geological features'
  },
  {
    id: '2',
    name: 'AnomalyScan',
    type: 'computer-vision',
    target: 'surface anomalies',
    accuracy: 0.92,
    lastTrained: '2023-12-05',
    description: 'Detects surface anomalies from satellite imagery'
  },
  {
    id: '3',
    name: 'OptimalDrill',
    type: 'reinforcement',
    target: 'drill locations',
    accuracy: 0.81,
    lastTrained: '2024-01-10',
    description: 'Recommends optimal drilling locations based on historical data'
  },
];

interface AIAnalysisPanelProps {
  className?: string;
}

const AIAnalysisPanel: React.FC<AIAnalysisPanelProps> = ({ className }) => {
  const [models] = useState<ModelInfo[]>(initialModels);
  const [selectedModel, setSelectedModel] = useState<string>('1');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getModelTypeIcon = (type: string) => {
    switch (type) {
      case 'predictive':
        return <TrendingUp size={16} />;
      case 'computer-vision':
        return <Eye size={16} />;
      case 'reinforcement':
        return <Layers size={16} />;
      default:
        return <Brain size={16} />;
    }
  };

  const selectedModelInfo = models.find(model => model.id === selectedModel);

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader>
        <CardTitle>AI Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="models">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="models" className="mt-4 space-y-4">
            <div className="space-y-3">
              {models.map((model) => (
                <div 
                  key={model.id} 
                  className={`analysis-card cursor-pointer ${selectedModel === model.id ? 'ring-2 ring-primary/50' : ''}`}
                  onClick={() => setSelectedModel(model.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <span className="mr-2 p-1.5 rounded-md bg-primary/10 text-primary">
                        {getModelTypeIcon(model.type)}
                      </span>
                      <div>
                        <h3 className="font-medium">{model.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {model.type} • Accuracy: {(model.accuracy * 100).toFixed(1)}% • Updated: {formatDate(model.lastTrained)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        checked={selectedModel === model.id} 
                        onChange={() => setSelectedModel(model.id)} 
                        className="mr-1"
                      />
                    </div>
                  </div>
                  {model.description && (
                    <p className="text-sm mt-2 text-muted-foreground">{model.description}</p>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="parameters" className="mt-4 space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Mineral</label>
                <Select defaultValue="copper">
                  <SelectTrigger>
                    <SelectValue placeholder="Select mineral" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="copper">Copper</SelectItem>
                    <SelectItem value="cobalt">Cobalt</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="iron">Iron</SelectItem>
                    <SelectItem value="zinc">Zinc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Confidence Threshold</label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select threshold" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (60%)</SelectItem>
                    <SelectItem value="medium">Medium (75%)</SelectItem>
                    <SelectItem value="high">High (90%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Analysis Type</label>
                <Select defaultValue="full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select analysis type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quick">Quick Scan</SelectItem>
                    <SelectItem value="full">Full Analysis</SelectItem>
                    <SelectItem value="deep">Deep Learning Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="history" className="mt-4">
            <div className="text-center p-8 text-muted-foreground">
              <Brain size={32} className="mx-auto mb-3" />
              <p>No recent analysis history</p>
              <p className="text-sm mt-2">Previous analysis results will appear here</p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-4 border-t">
          <div className="flex flex-col gap-4">
            {selectedModelInfo && (
              <div className="text-sm">
                <p className="font-medium">Selected Model: {selectedModelInfo.name}</p>
                <p className="text-muted-foreground text-xs mt-1">{selectedModelInfo.description}</p>
              </div>
            )}

            {isAnalyzing ? (
              <div className="space-y-2">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300" 
                    style={{ width: `${analysisProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Analyzing... {analysisProgress}%
                </p>
              </div>
            ) : (
              <Button 
                className="w-full bg-geo-blue hover:bg-blue-800" 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                <Brain size={16} className="mr-2" />
                Run Analysis
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAnalysisPanel;

export function Eye(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
