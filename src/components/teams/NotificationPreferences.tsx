
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NotificationPreference {
  type: string;
  enabled: boolean;
  teamsChannelId: string;
}

interface NotificationPreferencesProps {
  preferences: NotificationPreference[];
  onTogglePreference: (index: number, enabled: boolean) => void;
  onChangeChannel: (index: number, channelId: string) => void;
  platform: string;
}

const getNotificationTypeLabel = (type: string) => {
  switch (type) {
    case 'anomaly_alerts':
      return 'Anomaly Alerts';
    case 'daily_summaries':
      return 'Daily Summaries';
    case 'task_notifications':
      return 'Task Notifications';
    case 'file_sharing':
      return 'File Sharing';
    default:
      return type;
  }
};

const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({
  preferences,
  onTogglePreference,
  onChangeChannel,
  platform
}) => {
  // Mock channels - in a real app, these would be fetched from the Teams API
  const availableChannels = [
    { id: 'general', name: 'General' },
    { id: 'reports', name: 'Reports' },
    { id: 'tasks', name: 'Tasks' },
    { id: 'files', name: 'Files' },
    { id: 'alerts', name: 'Alerts' },
  ];

  return (
    <div className="space-y-4 mt-6 border-t pt-4">
      <h3 className="text-sm font-medium mb-2">Notification Preferences</h3>
      
      <div className="space-y-4">
        {preferences.map((preference, index) => (
          <div key={preference.type} className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">
                {getNotificationTypeLabel(preference.type)}
              </Label>
              <p className="text-xs text-muted-foreground">
                {preference.enabled ? `Sending to #${preference.teamsChannelId}` : 'Disabled'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {preference.enabled && (
                <Select
                  value={preference.teamsChannelId}
                  onValueChange={(value) => onChangeChannel(index, value)}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableChannels.map((channel) => (
                      <SelectItem key={channel.id} value={channel.id}>
                        #{channel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Switch
                checked={preference.enabled}
                onCheckedChange={(checked) => onTogglePreference(index, checked)}
              />
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-muted-foreground mt-4">
        Configure which notifications are sent to your {platform} workspace and where they're delivered.
      </p>
    </div>
  );
};

export default NotificationPreferences;
