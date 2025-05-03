
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Slack } from "lucide-react";
import SlackIntegration from '@/components/slack/SlackIntegration';
import TeamsIntegration from '@/components/teams/TeamsIntegration';

export const IntegrationsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Alert variant="default" className="bg-primary/10 border-primary/20">
        <MessageSquare className="h-5 w-5" />
        <AlertTitle>Communication Platform Integrations</AlertTitle>
        <AlertDescription>
          Connect with your team collaboration platforms to streamline workflows and notifications
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="slack" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger value="slack">
            <div className="flex items-center gap-2">
              <Slack className="h-4 w-4" />
              <span>Slack</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="teams">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Microsoft Teams</span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="slack">
          <SlackIntegration />
        </TabsContent>
        
        <TabsContent value="teams">
          <TeamsIntegration />
        </TabsContent>
      </Tabs>
    </div>
  );
};
