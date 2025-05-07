
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { GeoAnalysisResult } from '@/types/datasets';

// Import the new component files
import AnalysisIcon from './shapefile-analysis/AnalysisIcon';
import BufferAnalysisTab from './shapefile-analysis/BufferAnalysisTab';
import OverlayAnalysisTab from './shapefile-analysis/OverlayAnalysisTab';
import QueryAnalysisTab from './shapefile-analysis/QueryAnalysisTab';
import { showAnalysisCompletionToast } from './shapefile-analysis/utils';

interface ShapefileAnalysisProps {
  data: any;
  onAnalysisComplete?: (result: GeoAnalysisResult) => void;
}

const ShapefileAnalysis: React.FC<ShapefileAnalysisProps> = ({ data, onAnalysisComplete }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("buffer");
  
  console.log("Rendering ShapefileAnalysis component", { 
    activeTab,
    dataFeatures: data?.features?.length
  });

  const handleAnalysisComplete = (result: GeoAnalysisResult) => {
    console.log("Analysis completed", result);
    
    showAnalysisCompletionToast(toast, result.type, result.metadata.parameters || {});
    
    if (onAnalysisComplete) {
      onAnalysisComplete(result);
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
              <AnalysisIcon type="buffer" /> Buffer
            </TabsTrigger>
            <TabsTrigger value="intersect" className="flex items-center gap-1">
              <AnalysisIcon type="intersect" /> Overlay
            </TabsTrigger>
            <TabsTrigger value="query" className="flex items-center gap-1">
              <AnalysisIcon type="query" /> Query
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="buffer">
            <BufferAnalysisTab 
              data={data} 
              onAnalysisComplete={handleAnalysisComplete} 
            />
          </TabsContent>
          
          <TabsContent value="intersect">
            <OverlayAnalysisTab />
          </TabsContent>
          
          <TabsContent value="query">
            <QueryAnalysisTab data={data} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ShapefileAnalysis;
