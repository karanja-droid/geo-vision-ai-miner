import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Info, Loader2 } from "lucide-react";
import { GeoAnalysisResult } from '@/types/datasets';

interface BufferAnalysisTabProps {
  data: any;
  onAnalysisComplete?: (result: GeoAnalysisResult) => void;
}

const BufferAnalysisTab: React.FC<BufferAnalysisTabProps> = ({ data, onAnalysisComplete }) => {
  const [bufferDistance, setBufferDistance] = useState<number>(1);
  const [bufferUnit, setBufferUnit] = useState<string>("km");
  const [processing, setProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  
  console.log("Rendering BufferAnalysisTab", { bufferDistance, bufferUnit });
  
  const handleBufferAnalysis = () => {
    console.log("Starting buffer analysis", { bufferDistance, bufferUnit, dataFeatures: data.features?.length });
    setProcessing(true);
    setProgress(0);
    
    // Simulate analysis with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          
          // Mock result for demonstration
          const analysisResult: GeoAnalysisResult = {
            id: `buffer-${Date.now()}`,
            name: `Buffer Analysis (${bufferDistance} ${bufferUnit})`,
            description: `Buffer zones with distance ${bufferDistance} ${bufferUnit}`,
            timestamp: new Date().toISOString(),
            type: 'buffer',
            features: data.features.map((feature: any) => ({
              id: feature.id || `feature-${Math.random().toString(36).substr(2, 9)}`,
              name: feature.properties?.name || 'Unnamed feature',
              type: feature.geometry?.type || 'unknown',
              properties: {
                ...feature.properties,
                buffer_distance: bufferDistance,
                buffer_unit: bufferUnit
              }
            })),
            metadata: {
              executionTime: 1.24,
              timestamp: new Date().toISOString(),
              parameters: {
                distance: bufferDistance,
                unit: bufferUnit
              }
            },
            summary: {
              featureCount: data.features.length,
              area: Math.random() * 1000,
              length: Math.random() * 100
            },
            result: {
              type: 'FeatureCollection',
              features: data.features.map((feature: any) => ({
                ...feature,
                properties: {
                  ...feature.properties,
                  buffer_distance: bufferDistance,
                  buffer_unit: bufferUnit
                }
              }))
            }
          };
          
          console.log("Buffer analysis complete", analysisResult);
          
          if (onAnalysisComplete) {
            onAnalysisComplete(analysisResult);
          }
          
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };
  
  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Create buffer zones around features with specified distance
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-sm font-medium">Buffer Distance</label>
          <Input 
            type="number" 
            min="0.1" 
            step="0.1" 
            value={bufferDistance}
            onChange={(e) => setBufferDistance(parseFloat(e.target.value))}
          />
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium">Unit</label>
          <Select value={bufferUnit} onValueChange={setBufferUnit}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="m">Meters</SelectItem>
              <SelectItem value="km">Kilometers</SelectItem>
              <SelectItem value="ft">Feet</SelectItem>
              <SelectItem value="mi">Miles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm font-medium">Buffer Parameters</div>
        <div className="grid grid-cols-2 gap-2">
          <Select defaultValue="round">
            <SelectTrigger>
              <SelectValue placeholder="End Cap Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="round">Round</SelectItem>
              <SelectItem value="flat">Flat</SelectItem>
              <SelectItem value="square">Square</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="16">
            <SelectTrigger>
              <SelectValue placeholder="Segments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8">8 segments</SelectItem>
              <SelectItem value="16">16 segments</SelectItem>
              <SelectItem value="32">32 segments</SelectItem>
              <SelectItem value="64">64 segments</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {processing ? (
        <div className="space-y-2 mt-4">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-center text-muted-foreground">
            Processing buffer analysis... {progress}%
          </p>
        </div>
      ) : (
        <Button className="w-full mt-4" onClick={handleBufferAnalysis}>
          <ArrowRight className="h-4 w-4 mr-2" />
          Run Buffer Analysis
        </Button>
      )}
    </div>
  );
};

export default BufferAnalysisTab;
