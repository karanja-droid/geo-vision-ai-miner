
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const StructureInterpretation: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Structure Interpretation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Badge variant="outline" className="mr-2">Fault Lines</Badge>
              <span className="text-sm">3 detected</span>
            </div>
            <Badge variant="default">High Confidence</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Badge variant="outline" className="mr-2">Folding Patterns</Badge>
              <span className="text-sm">Anticline structure</span>
            </div>
            <Badge variant="secondary">Medium Confidence</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Badge variant="outline" className="mr-2">Mineralization</Badge>
              <span className="text-sm">250-450m depth</span>
            </div>
            <Badge variant="default">High Confidence</Badge>
          </div>
          
          <Alert>
            <AlertDescription>
              Model suggests a previously undetected fault line in the northeastern section
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
};

export default StructureInterpretation;
