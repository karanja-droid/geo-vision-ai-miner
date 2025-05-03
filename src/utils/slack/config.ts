
import { SlackIntegration } from "@/types";

// Default configuration for slack integrations
export const defaultSlackConfig: SlackIntegration = {
  webhookUrl: '',
  enabled: false,
  channelMappings: [],
  notificationPreferences: [
    { 
      type: 'anomaly_alerts', 
      enabled: true,
      slackChannelId: 'general'
    },
    { 
      type: 'daily_summaries', 
      enabled: true,
      slackChannelId: 'analysis-results'
    },
    { 
      type: 'task_notifications', 
      enabled: true,
      slackChannelId: 'field-team'
    },
    { 
      type: 'file_sharing', 
      enabled: true,
      slackChannelId: 'data-sharing'
    }
  ]
};

// Get slack configuration from localStorage or use default
export const getSlackConfig = (): SlackIntegration => {
  const stored = localStorage.getItem('slackIntegration');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored Slack configuration', e);
      return defaultSlackConfig;
    }
  }
  return defaultSlackConfig;
};

// Save slack configuration to localStorage
export const saveSlackConfig = (config: SlackIntegration): void => {
  localStorage.setItem('slackIntegration', JSON.stringify(config));
};
