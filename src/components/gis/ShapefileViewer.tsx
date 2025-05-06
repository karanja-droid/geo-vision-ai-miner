
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Map, Layers, Code } from "lucide-react";

interface ShapefileViewerProps {
  data: any;
}

const ShapefileViewer: React.FC<ShapefileViewerProps> = ({ data }) => {
  const [viewMode, setViewMode] = useState<string>("map");
  
  const renderMapView = () => {
    return (
      <div className="relative h-[400px] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden rounded-md">
        {/* Simulated map visualization */}
        <div className="absolute inset-0">
          <div className="h-full w-full grid-pattern">
            {/* Render features based on their geometry type */}
            {data.features.map((feature: any, index: number) => {
              if (feature.geometry.type === "Polygon") {
                // Simulate polygon rendering
                return (
                  <div 
                    key={index}
                    className="absolute border-2 border-blue-500 bg-blue-200/30"
                    style={{
                      left: '20%',
                      top: '30%',
                      width: '40%',
                      height: '30%',
                      borderRadius: '5px'
                    }}
                  />
                );
              } else if (feature.geometry.type === "Point") {
                // Simulate point rendering
                return (
                  <div 
                    key={index}
                    className="absolute w-4 h-4 rounded-full bg-red-500 border-2 border-white"
                    style={{
                      left: '45%',
                      top: '40%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
        
        {/* Map controls overlay */}
        <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm p-2 rounded-md border shadow-sm">
          <div className="flex flex-col gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Layers className="h-3 w-3" />
              <span className="text-xs">Features: {data.features.length}</span>
            </Badge>
            {data.features.map((feature: any, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature.properties.name || `Feature ${index + 1}`}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Placeholder for real map */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-sm text-muted-foreground bg-background/90 backdrop-blur-sm px-4 py-2 rounded-md">
            Interactive map would render shapefile data here
          </div>
        </div>
      </div>
    );
  };
  
  const renderDataView = () => {
    return (
      <div className="h-[400px] overflow-auto rounded-md border bg-muted/50">
        <pre className="p-4 text-xs">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  };
  
  const renderAttributesView = () => {
    return (
      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-muted">
            <tr>
              <th className="border p-2 text-left text-sm">Feature</th>
              <th className="border p-2 text-left text-sm">Type</th>
              <th className="border p-2 text-left text-sm">Properties</th>
            </tr>
          </thead>
          <tbody>
            {data.features.map((feature: any, index: number) => (
              <tr key={index} className="border-b">
                <td className="border p-2 text-sm">{feature.properties.name || `Feature ${index + 1}`}</td>
                <td className="border p-2 text-sm">{feature.geometry.type}</td>
                <td className="border p-2">
                  <div className="space-y-1">
                    {Object.entries(feature.properties).map(([key, value]: [string, any]) => (
                      <div key={key} className="grid grid-cols-2 gap-2 text-sm">
                        <span className="font-medium">{key}:</span>
                        <span>{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  return (
    <Card className="p-4">
      <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="map" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            Map View
          </TabsTrigger>
          <TabsTrigger value="attributes" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Attributes
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Raw Data
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="map">
          {renderMapView()}
        </TabsContent>
        
        <TabsContent value="attributes">
          {renderAttributesView()}
        </TabsContent>
        
        <TabsContent value="data">
          {renderDataView()}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ShapefileViewer;
