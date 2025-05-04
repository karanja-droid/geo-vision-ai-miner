
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const IntegrationStats: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Integration Statistics</CardTitle>
        <CardDescription>Current data integration metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Data Sources:</span>
            <span className="font-medium">42</span>
          </div>
          <Separator />
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Connected Datasets:</span>
            <span className="font-medium">187</span>
          </div>
          <Separator />
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Total Data Volume:</span>
            <span className="font-medium">1.73 TB</span>
          </div>
          <Separator />
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Integration Accuracy:</span>
            <span className="font-medium">94%</span>
          </div>
          <Separator />
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Last Updated:</span>
            <span className="font-medium">5 hours ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
