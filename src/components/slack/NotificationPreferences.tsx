import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { AlarmClock, CalendarDays, Bell, FilePlus, Slack } from "lucide-react";
import { SlackIntegration, SlackNotificationPreference } from "@/types";

interface NotificationPreferencesProps {
  config: SlackIntegration;
  onUpdateConfig: (newConfig: SlackIntegration) => void;
}

const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({ config, onUpdateConfig }) => {
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

  return (
    <div className="space-y-4">
      {config.notificationPreferences.map((preference) => (
        <div key={preference.type} className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="flex items-start space-x-3">
            {getFeatureIcon(preference.type)}
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">
                {getFeatureTitle(preference.type)}
              </h4>
              <p className="text-sm text-muted-foreground">
                {getFeatureDescription(preference.type)}
              </p>
              <p className="text-xs text-muted-foreground">
                Channel: #{preference.slackChannelId}
              </p>
            </div>
          </div>
          <Switch
            checked={preference.enabled}
            onCheckedChange={() => toggleNotificationType(preference.type)}
            disabled={!config.enabled}
          />
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
