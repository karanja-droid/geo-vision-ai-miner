
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare } from "lucide-react";
import ConnectionSettings from './ConnectionSettings';
import NotificationPreferences from './NotificationPreferences';

const TeamsIntegration: React.FC = () => {
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const { toast } = useToast();

  // Mock initial data - in a real app, this would be fetched from the backend
  const [notificationPreferences, setNotificationPreferences] = useState([
    { type: 'anomaly_alerts', enabled: true, teamsChannelId: 'general' },
    { type: 'daily_summaries', enabled: true, teamsChannelId: 'reports' },
    { type: 'task_notifications', enabled: false, teamsChannelId: 'tasks' },
    { type: 'file_sharing', enabled: false, teamsChannelId: 'files' },
  ]);

  const handleConnect = () => {
    if (!webhookUrl || webhookUrl.trim() === '') {
      toast({
        title: "Validation Error",
        description: "Please enter a valid Microsoft Teams webhook URL",
        variant: "destructive",
      });
      return;
    }

    // Mock the connection to Teams
    setIsConnected(true);
    toast({
      title: "Success",
      description: "Microsoft Teams integration connected successfully",
    });
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast({
      title: "Disconnected",
      description: "Microsoft Teams integration has been disconnected",
    });
  };

  const handleTestNotification = async () => {
    if (!isConnected) {
      toast({
        title: "Error",
        description: "Please connect to Microsoft Teams first",
        variant: "destructive",
      });
      return;
    }

    setIsTesting(true);
    
    try {
      // In a real app, this would be an API call to send a test message
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Test Notification Sent",
        description: "Check your Microsoft Teams channel for the test message",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send test notification",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleTogglePreference = (index: number, enabled: boolean) => {
    const updatedPreferences = [...notificationPreferences];
    updatedPreferences[index] = { ...updatedPreferences[index], enabled };
    setNotificationPreferences(updatedPreferences);
  };

  const handleChangeChannel = (index: number, teamsChannelId: string) => {
    const updatedPreferences = [...notificationPreferences];
    updatedPreferences[index] = { ...updatedPreferences[index], teamsChannelId };
    setNotificationPreferences(updatedPreferences);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <CardTitle>Microsoft Teams Integration</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`inline-block w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-300'}`}></span>
              <span className="text-sm font-medium">{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
          </div>
          <CardDescription>
            Connect GeoVision AI to your Microsoft Teams workspace to receive notifications and share insights with your team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ConnectionSettings 
            webhookUrl={webhookUrl} 
            setWebhookUrl={setWebhookUrl}
            isConnected={isConnected}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            onTestNotification={handleTestNotification}
            isTesting={isTesting}
            platform="Microsoft Teams"
          />

          {isConnected && (
            <NotificationPreferences 
              preferences={notificationPreferences}
              onTogglePreference={handleTogglePreference}
              onChangeChannel={handleChangeChannel}
              platform="Microsoft Teams"
            />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Microsoft Teams Notifications History</CardTitle>
          <CardDescription>
            View recent notifications sent to Microsoft Teams.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <p>No notification history to display.</p>
            <p className="text-sm">Notifications will appear here once they are sent.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamsIntegration;
