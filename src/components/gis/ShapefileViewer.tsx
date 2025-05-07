
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Map, Layers, Code, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ShapefileViewerProps {
  data: any;
}

const ShapefileViewer: React.FC<ShapefileViewerProps> = ({ data }) => {
  const [viewMode, setViewMode] = useState<string>("map");
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    console.log("ShapefileViewer data received:", {
      dataType: data?.type,
      featureCount: data?.features?.length
    });
    
    // Validate data structure
    if (!data) {
      setError("No data available to visualize");
    } else if (!data.type || !data.features) {
      setError("Invalid GeoJSON format");
    } else {
      setError(null);
    }
    
    // Log feature details for debugging
    if (data?.features && data.features.length > 0) {
      console.log("First feature details:", {
        type: data.features[0].geometry?.type,
        properties: data.features[0].properties,
        coordinates: data.features[0].geometry?.coordinates ? 
          `Array[${data.features[0].geometry.coordinates.length}]` : 
          'undefined'
      });
    }
    
    return () => {
      console.log("ShapefileViewer cleanup");
    };
  }, [data]);

  const renderMapView = () => {
    if (error) {
      return (
        <Alert variant="destructive" className="my-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      );
    }
    
    if (!data?.features || data.features.length === 0) {
      return (
        <div className="flex items-center justify-center h-[400px] bg-muted">
          <div className="text-center p-4">
            <Map className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No features to display</p>
          </div>
        </div>
      );
    }

    return (
      <div className="relative h-[400px] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden rounded-md">
        {/* Grid background */}
        <div className="absolute inset-0 grid-pattern"></div>
        
        {/* Render features based on their geometry type */}
        <div className="absolute inset-0">
          {data.features.map((feature: any, index: number) => {
            if (!feature.geometry) return null;
            
            const featureId = feature.id || `feature-${index}`;
            const featureName = feature.properties?.name || `Feature ${index + 1}`;
            
            if (feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon") {
              // Calculate a unique position for each polygon to visualize them separately
              const offsetX = (index % 3) * 30;
              const offsetY = Math.floor(index / 3) * 30;
              const width = 30 + (index % 2) * 10;
              const height = 20 + (index % 3) * 10;
              
              return (
                <div 
                  key={featureId}
                  className="absolute border-2 border-blue-500 bg-blue-200/30 rounded flex items-center justify-center"
                  style={{
                    left: `${10 + offsetX}%`,
                    top: `${15 + offsetY}%`,
                    width: `${width}%`,
                    height: `${height}%`,
                  }}
                  title={featureName}
                >
                  <span className="text-xs bg-white/70 px-1 rounded">{featureName}</span>
                </div>
              );
            } else if (feature.geometry.type === "Point") {
              // Calculate a position for each point
              const leftPos = 10 + (index * 5) % 80;
              const topPos = 10 + ((index * 7) % 80);
              
              return (
                <div 
                  key={featureId}
                  className="absolute w-4 h-4 rounded-full bg-red-500 border-2 border-white flex items-center justify-center"
                  style={{
                    left: `${leftPos}%`,
                    top: `${topPos}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  title={featureName}
                />
              );
            } else if (feature.geometry.type === "LineString" || feature.geometry.type === "MultiLineString") {
              // Create a zig-zag line to represent a LineString
              return (
                <div 
                  key={featureId}
                  className="absolute"
                  style={{
                    left: '10%',
                    top: `${20 + index * 5}%`,
                    width: '80%',
                    height: '2px',
                    background: 'linear-gradient(to right, #3B82F6 0%, #3B82F6 100%)',
                    clipPath: 'polygon(0 0, 33% 100%, 66% 0, 100% 100%)'
                  }}
                  title={featureName}
                />
              );
            }
            return null;
          })}
        </div>
        
        {/* Map controls overlay */}
        <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm p-2 rounded-md border shadow-sm">
          <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            <Badge variant="outline" className="flex items-center gap-1">
              <Layers className="h-3 w-3" />
              <span className="text-xs">Features: {data.features.length}</span>
            </Badge>
            {data.features.slice(0, 10).map((feature: any, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature.properties?.name || `Feature ${index + 1}`}
              </Badge>
            ))}
            {data.features.length > 10 && (
              <Badge variant="outline" className="text-xs">
                + {data.features.length - 10} more
              </Badge>
            )}
          </div>
        </div>
        
        {/* Placeholder notice */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-center">
          <div className="text-xs text-muted-foreground bg-background/90 backdrop-blur-sm px-3 py-1 rounded-md">
            Simplified visualization - connect to a GIS system for detailed rendering
          </div>
        </div>
      </div>
    );
  };
  
  const renderDataView = () => {
    if (!data) {
      return <div className="p-4 text-muted-foreground">No data available</div>;
    }
    
    return (
      <div className="h-[400px] overflow-auto rounded-md border bg-muted/50">
        <pre className="p-4 text-xs">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  };
  
  const renderAttributesView = () => {
    if (!data?.features || data.features.length === 0) {
      return <div className="p-4 text-muted-foreground">No features to display</div>;
    }
    
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
            {data.features.map((feature: any, index: number) => {
              if (!feature.geometry) return null;
              
              return (
                <tr key={index} className="border-b">
                  <td className="border p-2 text-sm">{feature.properties?.name || `Feature ${index + 1}`}</td>
                  <td className="border p-2 text-sm">{feature.geometry.type}</td>
                  <td className="border p-2">
                    <div className="space-y-1">
                      {feature.properties ? Object.entries(feature.properties).map(([key, value]: [string, any]) => (
                        <div key={key} className="grid grid-cols-2 gap-2 text-sm">
                          <span className="font-medium">{key}:</span>
                          <span>{String(value)}</span>
                        </div>
                      )) : (
                        <span className="text-sm text-muted-foreground">No properties</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  
  // If no data is provided at all, show a placeholder
  if (!data) {
    return (
      <Card className="p-4">
        <div className="flex flex-col items-center justify-center p-8">
          <Map className="h-12 w-12 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">No Shapefile Data</h3>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Upload and process a shapefile to visualize geological data
          </p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="p-4">
      <Tabs 
        value={viewMode} 
        onValueChange={(value) => {
          console.log(`Changing view mode to ${value}`);
          setViewMode(value);
        }} 
        className="w-full"
      >
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
