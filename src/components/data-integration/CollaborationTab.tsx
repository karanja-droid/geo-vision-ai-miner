
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slack, MessageSquare } from "lucide-react";
import { CollaborationCard } from './CollaborationCard';

export const CollaborationTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Alert variant="default" className="bg-primary/10 border-primary/20">
        <Slack className="h-5 w-5" />
        <AlertTitle>Team Collaboration Integration</AlertTitle>
        <AlertDescription>
          Connect communication platforms to receive notifications and share insights
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CollaborationCard
          platform="Slack"
          status="Connected"
          icon={<Slack className="h-8 w-8" />}
          features={[
            "Automated alerts for anomaly detection",
            "Daily summaries of AI analysis results",
            "Task notifications for field teams",
            "Direct file sharing from the platform"
          ]}
        />
        
        <CollaborationCard
          platform="Microsoft Teams"
          status="Ready to connect"
          icon={<MessageSquare className="h-8 w-8" />}
          features={[
            "Meeting scheduling based on analysis results",
            "Shared dashboards in Teams channels",
            "Integration with Power BI reports",
            "Video conferencing with data visualization"
          ]}
        />
      </div>
      
      <div className="p-4 border rounded-md bg-muted/50 mt-4">
        <h3 className="font-semibold mb-2">Notification Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Event Types</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-background">AI Analysis Complete</Badge>
              <Badge variant="outline" className="bg-background">High-priority Anomalies</Badge>
              <Badge variant="outline" className="bg-background">Task Assignments</Badge>
              <Badge variant="outline" className="bg-background">Field Reports</Badge>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Recipients</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-background">Geologists</Badge>
              <Badge variant="outline" className="bg-background">Drill Team</Badge>
              <Badge variant="outline" className="bg-background">Administrators</Badge>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Button>Configure Notifications</Button>
        </div>
      </div>
    </div>
  );
};
