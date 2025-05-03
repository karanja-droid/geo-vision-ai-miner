
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const InfoTabs: React.FC = () => {
  return (
    <Tabs defaultValue="details">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="algorithm">Algorithm</TabsTrigger>
        <TabsTrigger value="docs">Documentation</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="p-4 bg-muted rounded-md mt-2">
        <h4 className="font-medium mb-2">Model Details</h4>
        <p className="text-sm text-muted-foreground mb-2">
          GeoStructure-3D is a 3D Graph Convolutional Network designed specifically for modeling complex 
          geological structures from multiple data sources.
        </p>
        <div className="text-xs">
          <div><span className="font-medium">Type:</span> 3D Graph Convolutional Network</div>
          <div><span className="font-medium">Status:</span> In Development</div>
          <div><span className="font-medium">Last Updated:</span> March 20, 2024</div>
        </div>
      </TabsContent>
      <TabsContent value="algorithm" className="p-4 bg-muted rounded-md mt-2">
        <h4 className="font-medium mb-2">Algorithm</h4>
        <p className="text-sm text-muted-foreground">
          The model uses a 7-layer graph convolutional architecture with residual connections.
          Each node in the graph represents a point in 3D space, with edges connecting
          spatially adjacent points. Message passing between nodes allows for capturing
          complex geological relationships.
        </p>
      </TabsContent>
      <TabsContent value="docs" className="p-4 bg-muted rounded-md mt-2">
        <h4 className="font-medium mb-2">Documentation</h4>
        <p className="text-sm text-muted-foreground mb-2">
          For full documentation on integrating GeoStructure-3D into your workflows,
          refer to the API documentation.
        </p>
        <Button variant="link" size="sm" className="px-0">
          View API Documentation
        </Button>
      </TabsContent>
    </Tabs>
  );
};

export default InfoTabs;
