
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CircleDot, Scissors, Map, Calculator } from "lucide-react";

const AnalysisToolsTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Spatial Analysis Tools</h3>
        <p className="text-muted-foreground">Our platform offers several spatial analysis tools:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <CircleDot className="h-5 w-5 text-blue-500" />
                <h4 className="font-medium">Buffer Analysis</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Create buffer zones around features with customizable distance and parameters.
                Useful for proximity analysis and creating zones of influence.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Scissors className="h-5 w-5 text-purple-500" />
                <h4 className="font-medium">Overlay Operations</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Perform spatial overlay operations including union, intersection, 
                and difference between feature layers.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Map className="h-5 w-5 text-green-500" />
                <h4 className="font-medium">Spatial Joins</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Combine attributes from one feature to another based on their spatial relationship.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="h-5 w-5 text-amber-500" />
                <h4 className="font-medium">Attribute Queries</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Filter features using SQL-like queries based on attribute values.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalysisToolsTab;
