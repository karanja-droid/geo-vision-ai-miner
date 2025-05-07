
import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Loader2, Map, Scissors } from "lucide-react";

const OverlayAnalysisTab: React.FC = () => {
  console.log("Rendering OverlayAnalysisTab");
  
  return (
    <div className="space-y-4">
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
            <Map className="h-4 w-4 mr-2" />
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
    </div>
  );
};

export default OverlayAnalysisTab;
