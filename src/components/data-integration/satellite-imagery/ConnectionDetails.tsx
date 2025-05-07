
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw } from "lucide-react";

interface ConnectionDetailsProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  progress: number;
}

const ConnectionDetails: React.FC<ConnectionDetailsProps> = ({ 
  onRefresh, 
  isRefreshing, 
  progress 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connection Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-y-2">
            <p className="text-sm text-muted-foreground">API Endpoint:</p>
            <p className="text-sm font-medium">api.remotesensing.org/v2</p>
            
            <p className="text-sm text-muted-foreground">Access Level:</p>
            <p className="text-sm font-medium flex items-center">
              Premium
              <Badge className="ml-2 bg-amber-500">Enterprise</Badge>
            </p>
            
            <p className="text-sm text-muted-foreground">Status:</p>
            <p className="text-sm font-medium text-green-600">Active</p>
            
            <p className="text-sm text-muted-foreground">Last Sync:</p>
            <p className="text-sm font-medium">Today, 08:45 AM</p>
          </div>
          
          {isRefreshing ? (
            <div className="mt-4">
              <p className="text-sm mb-2">Refreshing connection...</p>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round(progress)}% complete
              </p>
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="mt-2 w-full" 
              onClick={onRefresh}
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh Connection
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionDetails;
