
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  userId: string;
  relatedTask?: string;
  workflowTriggered?: boolean;
  sentToSlack?: boolean;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId?: string;
  channelId?: string;
  attachments?: string[];
  createdAt: string;
  read: boolean;
  sentToSlack?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  members: string[];
  createdAt: string;
  lastActivity: string;
  stakeholderAccess?: import('./organizations').StakeholderOrganization[];
  slackChannel?: string; // ID of connected Slack channel
}

export interface SlackIntegration {
  webhookUrl: string;
  enabled: boolean;
  channelMappings: SlackChannelMapping[];
  notificationPreferences: SlackNotificationPreference[];
}

export interface SlackChannelMapping {
  internalChannelId: string;
  slackChannelId: string;
}

export interface SlackNotificationPreference {
  type: 'anomaly_alerts' | 'daily_summaries' | 'task_notifications' | 'file_sharing';
  enabled: boolean;
  slackChannelId: string; // Where to send this type of notification
}
