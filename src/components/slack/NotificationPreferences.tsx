import React, { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Save, AlarmClock, CalendarDays, Bell, FilePlus, Slack, SendHorizontal } from "lucide-react";
import { SlackIntegration, SlackNotificationPreference } from "@/types";
import { sendAnomalyAlert, sendDailySummary } from "@/utils/slackIntegration";

interface NotificationPreferencesProps {
  config: SlackIntegration;
  onUpdateConfig: (newConfig: SlackIntegration) => void;
}

const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({ config, onUpdateConfig }) => {
  const [editingChannel, setEditingChannel] = useState<string | null>(null);
  const [channelValue, setChannelValue] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  const toggleNotificationType = (type: string) => {
    // Fix TypeScript error by explicitly typing the parameter and ensuring it matches allowed types
    const notificationType = type as 'anomaly_alerts' | 'daily_summaries' | 'task_notifications' | 'file_sharing';
    
    const newConfig = { ...config };
    const index = newConfig.notificationPreferences.findIndex(p => p.type === notificationType);
    
    if (index !== -1) {
      newConfig.notificationPreferences[index].enabled = !newConfig.notificationPreferences[index].enabled;
      onUpdateConfig(newConfig);
      
      // Format the type string for the toast message
      const formattedType = notificationType.replace('_', ' ');
      toast({
        title: "Notification Setting Updated",
        description: `${formattedType} notifications have been ${newConfig.notificationPreferences[index].enabled ? 'enabled' : 'disabled'}`,
      });
    }
  };

  const handleEditChannel = (type: SlackNotificationPreference['type']) => {
    const preference = config.notificationPreferences.find(p => p.type === type);
    if (preference) {
      setEditingChannel(type);
      setChannelValue(preference.slackChannelId);
    }
  };

  const handleSaveChannel = (type: SlackNotificationPreference['type']) => {
    const newConfig = { ...config };
    const index = newConfig.notificationPreferences.findIndex(p => p.type === type);
    
    if (index !== -1 && channelValue) {
      // Remove # if user entered it
      const formattedChannel = channelValue.startsWith('#') ? channelValue.substring(1) : channelValue;
      newConfig.notificationPreferences[index].slackChannelId = formattedChannel;
      onUpdateConfig(newConfig);
      
      toast({
        title: "Channel Updated",
        description: `Notifications will now be sent to #${formattedChannel}`,
      });
      
      setEditingChannel(null);
    }
  };

  // Function to send a test notification
  const sendTestNotification = async (type: SlackNotificationPreference['type']) => {
    setIsSending(true);
    
    try {
      let result = false;
      
      switch(type) {
        case 'anomaly_alerts':
          result = await sendAnomalyAlert({
            title: "Test Anomaly Alert",
            description: "This is a test anomaly alert from your mineral exploration platform.",
            confidence: 95,
            location: "Test Location"
          });
          break;
        case 'daily_summaries':
          result = await sendDailySummary({
            date: new Date().toISOString().split('T')[0],
            anomalies: 3,
            predictions: [
              { area: "Test Area 1", probability: 0.85 },
              { area: "Test Area 2", probability: 0.72 }
            ],
            insights: [
              "This is a test insight 1",
              "This is a test insight 2"
            ]
          });
          break;
        default:
          toast({
            title: "Test Not Implemented",
            description: "Test notification for this type is not implemented yet.",
            variant: "destructive"
          });
          setIsSending(false);
          return;
      }
      
      if (result) {
        toast({
          title: "Test Notification Sent",
          description: `A test ${getFeatureTitle(type).toLowerCase()} notification was sent to Slack.`,
        });
      } else {
        toast({
          title: "Failed to Send",
          description: "Make sure your Slack integration is enabled and webhook URL is correct.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error sending test notification:", error);
      toast({
        title: "Error",
        description: "An error occurred while sending the test notification.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  const getFeatureIcon = (type: SlackNotificationPreference['type']) => {
    switch (type) {
      case 'anomaly_alerts':
        return <AlarmClock className="h-5 w-5" />;
      case 'daily_summaries':
        return <CalendarDays className="h-5 w-5" />;
      case 'task_notifications':
        return <Bell className="h-5 w-5" />;
      case 'file_sharing':
        return <FilePlus className="h-5 w-5" />;
      default:
        return <Slack className="h-5 w-5" />;
    }
  };

  const getFeatureTitle = (type: SlackNotificationPreference['type']) => {
    switch (type) {
      case 'anomaly_alerts':
        return 'Automated Anomaly Detection Alerts';
      case 'daily_summaries':
        return 'Daily AI Analysis Summaries';
      case 'task_notifications':
        return 'Task Notifications for Field Teams';
      case 'file_sharing':
        return 'Direct File Sharing';
      default:
        // Cast to string to handle the 'never' type issue
        return String(type).replace(/_/g, ' ');
    }
  };

  const getFeatureDescription = (type: SlackNotificationPreference['type']) => {
    switch (type) {
      case 'anomaly_alerts':
        return 'Send real-time alerts when AI detects geological anomalies that may indicate mineral deposits';
      case 'daily_summaries':
        return 'Automated daily reports of AI analysis results, insights and predictions';
      case 'task_notifications':
        return 'Notify field teams about new assignments, priority changes, and task updates';
      case 'file_sharing':
        return 'Share analysis reports, geological maps, and other documents directly to Slack';
      default:
        return '';
    }
  };

  // Status indicator for the Slack integration
  const integrationStatus = () => {
    if (!config.webhookUrl) {
      return <div className="text-amber-500 text-sm flex items-center">
        <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
        Webhook URL not configured
      </div>;
    }
    
    if (!config.enabled) {
      return <div className="text-gray-500 text-sm flex items-center">
        <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>
        Integration disabled
      </div>;
    }
    
    return <div className="text-green-500 text-sm flex items-center">
      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
      Active and ready to send notifications
    </div>;
  };

  return (
    <div className="space-y-4">
      {/* Integration status indicator */}
      <div className="p-4 border rounded-lg bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Slack className="h-5 w-5" />
            <h3 className="font-medium">Slack Integration Status</h3>
          </div>
          {integrationStatus()}
        </div>
      </div>

      {config.notificationPreferences.map((preference) => (
        <div key={preference.type} className="flex flex-col rounded-lg border p-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-start space-x-3">
              {getFeatureIcon(preference.type)}
              <div className="space-y-1">
                <h4 className="text-sm font-medium leading-none">
                  {getFeatureTitle(preference.type)}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {getFeatureDescription(preference.type)}
                </p>
                
                {/* Channel configuration with edit capability */}
                {editingChannel === preference.type ? (
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-xs text-muted-foreground">#</span>
                    <Input
                      className="h-7 text-xs"
                      value={channelValue}
                      onChange={(e) => setChannelValue(e.target.value)}
                      placeholder="channel-name"
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => handleSaveChannel(preference.type)}
                    >
                      <Save className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center mt-1">
                    <p className="text-xs text-muted-foreground flex items-center">
                      Channel: #{preference.slackChannelId}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5 ml-1"
                        onClick={() => handleEditChannel(preference.type)}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                    </p>
                  </div>
                )}
              </div>
            </div>
            <Switch
              checked={preference.enabled}
              onCheckedChange={() => toggleNotificationType(preference.type)}
              disabled={!config.enabled}
            />
          </div>
          
          {/* Test notification button */}
          {config.enabled && preference.enabled && (
            <div className="mt-3 self-end">
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs"
                onClick={() => sendTestNotification(preference.type)}
                disabled={isSending}
              >
                <SendHorizontal className="h-3 w-3 mr-1" />
                {isSending ? "Sending..." : "Send Test Notification"}
              </Button>
            </div>
          )}
        </div>
      ))}
      
      <Separator className="my-4" />
      
      <div className="rounded-lg border p-4 bg-muted/50">
        <h4 className="font-medium mb-2">Implementation Status</h4>
        <ul className="space-y-2">
          <li className="flex items-center text-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span>Automated Alerts for Anomaly Detection</span>
          </li>
          <li className="flex items-center text-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span>Daily Summaries of AI Analysis Results</span>
          </li>
          <li className="flex items-center text-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span>Task Notifications for Field Teams</span>
          </li>
          <li className="flex items-center text-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span>Direct File Sharing from Platform</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationPreferences;
