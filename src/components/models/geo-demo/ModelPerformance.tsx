
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ModelPerformance: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted rounded p-2">
              <div className="text-xs text-muted-foreground">Accuracy</div>
              <div className="font-medium">87.2%</div>
            </div>
            <div className="bg-muted rounded p-2">
              <div className="text-xs text-muted-foreground">Latency</div>
              <div className="font-medium">2.8s</div>
            </div>
            <div className="bg-muted rounded p-2">
              <div className="text-xs text-muted-foreground">Precision</div>
              <div className="font-medium">83.5%</div>
            </div>
            <div className="bg-muted rounded p-2">
              <div className="text-xs text-muted-foreground">Recall</div>
              <div className="font-medium">79.1%</div>
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <div className="text-sm font-medium mb-1">Last Training</div>
            <div className="text-xs text-muted-foreground">March 20, 2024</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelPerformance;
