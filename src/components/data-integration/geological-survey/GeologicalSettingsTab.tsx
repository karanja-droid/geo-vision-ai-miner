
import React from 'react';
import { Button } from "@/components/ui/button";

export const GeologicalSettingsTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium mb-1">API Endpoint</h3>
          <p className="text-sm text-muted-foreground">https://api.geological-survey.org/v1/data</p>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-1">Authentication</h3>
          <p className="text-sm text-muted-foreground">OAuth 2.0</p>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-1">Rate Limit</h3>
          <p className="text-sm text-muted-foreground">100 requests / minute</p>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-1">Data Refresh</h3>
          <p className="text-sm text-muted-foreground">Quarterly</p>
        </div>
      </div>
      
      <div className="pt-4">
        <Button variant="outline">
          Advanced Settings
        </Button>
      </div>
    </div>
  );
};
