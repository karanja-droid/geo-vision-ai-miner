
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DataLayerSelectionProps {
  activeDataType: string;
  setActiveDataType: (type: string) => void;
}

export const DataLayerSelection: React.FC<DataLayerSelectionProps> = ({ 
  activeDataType, 
  setActiveDataType 
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Layers className="h-5 w-5 mr-2" />
          Data Layer Selection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="satellite">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="satellite" onClick={() => setActiveDataType("satellite")}>Satellite</TabsTrigger>
            <TabsTrigger value="geological" onClick={() => setActiveDataType("geological")}>Geological</TabsTrigger>
            <TabsTrigger value="mining" onClick={() => setActiveDataType("mining")}>Mining</TabsTrigger>
          </TabsList>
          
          <TabsContent value="satellite" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Multispectral Imagery</span>
              <Badge>Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Thermal Bands</span>
              <Badge variant="outline">Available</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Near-Infrared</span>
              <Badge variant="outline">Available</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Satellite data provides surface spectral signatures that can indicate mineral deposits
            </p>
          </TabsContent>
          
          <TabsContent value="geological" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Lithological Maps</span>
              <Badge>Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Fault Lines</span>
              <Badge variant="outline">Available</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Geochemical Data</span>
              <Badge variant="outline">Available</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Geological survey data provides insights into rock formations and structural features
            </p>
          </TabsContent>
          
          <TabsContent value="mining" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Historical Sites</span>
              <Badge>Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Production Data</span>
              <Badge variant="outline">Available</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Reserves Estimates</span>
              <Badge variant="outline">Available</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Mining history provides context for potential future exploitation
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
