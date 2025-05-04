
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Share2, Save, RefreshCw, Settings } from '../IconComponents';

export const QuickActions: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <CardDescription>Common integration tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="h-auto py-2 justify-start" size="sm">
            <Download className="h-4 w-4 mr-2" />
            <div className="text-left">
              <div className="text-xs font-medium">Export Data</div>
              <div className="text-xs text-muted-foreground">Download integrated datasets</div>
            </div>
          </Button>
          
          <Button variant="outline" className="h-auto py-2 justify-start" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            <div className="text-left">
              <div className="text-xs font-medium">Share View</div>
              <div className="text-xs text-muted-foreground">Create shareable link</div>
            </div>
          </Button>
          
          <Button variant="outline" className="h-auto py-2 justify-start" size="sm">
            <Save className="h-4 w-4 mr-2" />
            <div className="text-left">
              <div className="text-xs font-medium">Save View</div>
              <div className="text-xs text-muted-foreground">Store current settings</div>
            </div>
          </Button>
          
          <Button variant="outline" className="h-auto py-2 justify-start" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            <div className="text-left">
              <div className="text-xs font-medium">Refresh Data</div>
              <div className="text-xs text-muted-foreground">Update all sources</div>
            </div>
          </Button>
          
          <Button variant="outline" className="h-auto py-2 justify-start col-span-2" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            <div className="text-left">
              <div className="text-xs font-medium">Advanced Settings</div>
              <div className="text-xs text-muted-foreground">Configure integration parameters</div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
