
import React from 'react';
import { Wifi } from "lucide-react";

const ConnectionMetrics: React.FC = () => {
  return (
    <div className="border rounded-lg p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Wifi className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Connection Metrics</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-muted/50 p-3 rounded-md">
          <p className="text-sm text-muted-foreground">API Requests (24h)</p>
          <p className="text-2xl font-semibold">1,256</p>
          <p className="text-xs text-green-600">+12% from yesterday</p>
        </div>
        
        <div className="bg-muted/50 p-3 rounded-md">
          <p className="text-sm text-muted-foreground">Data Transfer</p>
          <p className="text-2xl font-semibold">87.4 GB</p>
          <p className="text-xs text-green-600">98.7% success rate</p>
        </div>
        
        <div className="bg-muted/50 p-3 rounded-md">
          <p className="text-sm text-muted-foreground">Response Time</p>
          <p className="text-2xl font-semibold">185 ms</p>
          <p className="text-xs text-amber-600">+23ms from average</p>
        </div>
        
        <div className="bg-muted/50 p-3 rounded-md">
          <p className="text-sm text-muted-foreground">Uptime</p>
          <p className="text-2xl font-semibold">99.98%</p>
          <p className="text-xs text-green-600">Last outage: 15 days ago</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectionMetrics;
