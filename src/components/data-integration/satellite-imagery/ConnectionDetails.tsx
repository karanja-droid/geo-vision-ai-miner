
import React, { useState } from 'react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Image, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ConnectionDetailsProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  progress: number;
}

const ConnectionDetails: React.FC<ConnectionDetailsProps> = ({ onRefresh, isRefreshing, progress }) => {
  return (
    <div className="border rounded-lg p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Image className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Connection Details</h3>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Status:</span>
          <Badge variant="default" className="bg-green-600">Active</Badge>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">API Endpoint:</span>
          <span className="text-sm font-medium">api.remotesensing.org/v2</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Last Synced:</span>
          <span className="text-sm font-medium">Today at 09:45 AM</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Data Volume:</span>
          <span className="text-sm font-medium">1.73 TB</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Connection Type:</span>
          <span className="text-sm font-medium">Secure REST API</span>
        </div>
      </div>
      
      <div className="pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Connection
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ConnectionDetails;
