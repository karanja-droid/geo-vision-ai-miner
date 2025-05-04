
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Combine } from "lucide-react";

export const IntegrationControls: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Combine className="h-5 w-5 mr-2" />
          Data Integration Controls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-1">Integration Level</h4>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" className="h-8">Basic</Button>
              <Button variant="default" size="sm" className="h-8">Advanced</Button>
              <Button variant="outline" size="sm" className="h-8">Expert</Button>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Integration Method</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="h-8">AI-Assisted</Button>
              <Button variant="default" size="sm" className="h-8">Manual</Button>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Data Resolution</h4>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" className="h-8">Low</Button>
              <Button variant="default" size="sm" className="h-8">Medium</Button>
              <Button variant="outline" size="sm" className="h-8">High</Button>
            </div>
          </div>
          
          <Button className="w-full mt-2">Apply Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};
