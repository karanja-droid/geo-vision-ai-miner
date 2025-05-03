
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slack } from "lucide-react";
import { getSlackConfig, saveSlackConfig } from "@/utils/slackIntegration";
import { SlackIntegration as SlackIntegrationType } from "@/types";
import ConnectionSettings from './ConnectionSettings';
import NotificationPreferences from './NotificationPreferences';

interface SlackIntegrationProps {
  className?: string;
}

const SlackIntegration: React.FC<SlackIntegrationProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<SlackIntegrationType>(getSlackConfig());
  
  const handleSaveSettings = (values: any) => {
    setIsLoading(true);
    
    // Update config with new values
    const newConfig = {
      ...config,
      webhookUrl: values.webhookUrl,
      enabled: values.enabled
    };
    
    // Save to storage
    saveSlackConfig(newConfig);
    setConfig(newConfig);
    
    setIsLoading(false);
  };

  const handleUpdateConfig = (newConfig: SlackIntegrationType) => {
    saveSlackConfig(newConfig);
    setConfig(newConfig);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Slack className="h-5 w-5" />
          <CardTitle>Slack Integration</CardTitle>
        </div>
        <CardDescription>
          Connect with Slack to enhance team collaboration and receive real-time notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="settings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="settings">Connection Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notification Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings">
            <ConnectionSettings 
              config={config}
              onSaveSettings={handleSaveSettings}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationPreferences 
              config={config}
              onUpdateConfig={handleUpdateConfig}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SlackIntegration;
