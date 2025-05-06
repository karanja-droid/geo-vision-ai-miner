
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Calculator,
  CircleDot,
  Scissors,
  Union,
  Map,
  Ruler,
  ArrowRight,
  Info,
  Loader2
} from "lucide-react";
import { GeoAnalysisResult } from '@/types/datasets';

interface ShapefileAnalysisProps {
  data: any;
  onAnalysisComplete?: (result: GeoAnalysisResult) => void;
}

const ShapefileAnalysis: React.FC<ShapefileAnalysisProps> = ({ data, onAnalysisComplete }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("buffer");
  const [bufferDistance, setBufferDistance] = useState<number>(1);
  const [bufferUnit, setBufferUnit] = useState<string>("km");
  const [processing, setProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  
  const handleBufferAnalysis = () => {
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
            type: 'buffer',
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
            },
            metadata: {
              executionTime: 1.24,
              timestamp: new Date().toISOString(),
              parameters: {
                distance: bufferDistance,
                unit: bufferUnit
              }
            }
          };
          
          if (onAnalysisComplete) {
            onAnalysisComplete(analysisResult);
          }
          
          toast({
            title: "Analysis Complete",
            description: `Buffer analysis completed with ${bufferDistance}${bufferUnit} distance`,
          });
          
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };
  
  const renderAnalysisIcon = (type: string) => {
    switch (type) {
      case 'buffer':
        return <CircleDot className="h-4 w-4" />;
      case 'intersect':
        return <Scissors className="h-4 w-4" />;
      case 'union':
        return <Union className="h-4 w-4" />;
      case 'measure':
        return <Ruler className="h-4 w-4" />;
      case 'query':
        return <Calculator className="h-4 w-4" />;
      default:
        return <Map className="h-4 w-4" />;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Spatial Analysis</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="buffer" className="flex items-center gap-1">
              {renderAnalysisIcon('buffer')} Buffer
            </TabsTrigger>
            <TabsTrigger value="intersect" className="flex items-center gap-1">
              {renderAnalysisIcon('intersect')} Overlay
            </TabsTrigger>
            <TabsTrigger value="query" className="flex items-center gap-1">
              {renderAnalysisIcon('query')} Query
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="buffer" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="intersect" className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Perform spatial overlay operations between feature layers
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Operation Type</label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">
                  <Union className="h-4 w-4 mr-2" />
                  Union
                </Button>
                <Button variant="outline" className="justify-start">
                  <Scissors className="h-4 w-4 mr-2" />
                  Intersection
                </Button>
                <Button variant="outline" className="justify-start">
                  <Map className="h-4 w-4 mr-2" />
                  Difference
                </Button>
                <Button variant="outline" className="justify-start">
                  <Map className="h-4 w-4 mr-2" />
                  Symmetric Difference
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Layer</label>
              <Select defaultValue="internal">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal">Current features</SelectItem>
                  <SelectItem value="upload">Upload new layer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="w-full" disabled>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Select Operation Type and Layers
            </Button>
          </TabsContent>
          
          <TabsContent value="query" className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Filter and query features using SQL-like expressions
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Query Expression</label>
              <Input 
                placeholder="e.g. mineralDeposits LIKE '%Copper%'" 
              />
              <p className="text-xs text-muted-foreground">
                Use attribute names from your data with operators like =, >, &lt;, LIKE, AND, OR
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Available Attributes</label>
              <div className="bg-muted p-2 rounded-md text-xs">
                {Object.keys(data.features[0]?.properties || {}).map((key) => (
                  <span key={key} className="inline-block px-2 py-1 bg-background rounded-md m-1">
                    {key}
                  </span>
                ))}
              </div>
            </div>
            
            <Button className="w-full">
              <Calculator className="h-4 w-4 mr-2" />
              Run Query
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ShapefileAnalysis;
