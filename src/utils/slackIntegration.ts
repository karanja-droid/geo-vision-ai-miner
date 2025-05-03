
import { toast } from "@/hooks/use-toast";
import { Message, Notification, SlackIntegration, Task } from "@/types";

// Default configuration for slack integrations
const defaultSlackConfig: SlackIntegration = {
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

// Send a message to a Slack channel
export const sendToSlack = async (
  message: string, 
  channelId?: string,
  attachments?: any[]
): Promise<boolean> => {
  const config = getSlackConfig();
  
  if (!config.enabled || !config.webhookUrl) {
    console.warn('Slack integration is not enabled or webhook URL is not configured');
    return false;
  }

  try {
    // Format message for Slack
    const payload = {
      text: message,
      channel: channelId || 'general',
      attachments: attachments || []
    };

    const response = await fetch(config.webhookUrl, {
      method: 'POST',
      mode: 'no-cors', // Using no-cors to handle CORS restrictions with Slack webhooks
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    console.log('Slack notification sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send Slack notification:', error);
    return false;
  }
};

// Send anomaly detection alert to Slack
export const sendAnomalyAlert = async (
  anomalyData: { title: string; description: string; confidence: number; location?: string }
): Promise<boolean> => {
  const config = getSlackConfig();
  const preference = config.notificationPreferences.find(p => p.type === 'anomaly_alerts');
  
  if (!preference?.enabled) return false;
  
  const message = `🚨 *ANOMALY DETECTED*: ${anomalyData.title}\n${anomalyData.description}\nConfidence: ${anomalyData.confidence}%${anomalyData.location ? `\nLocation: ${anomalyData.location}` : ''}`;
  
  const result = await sendToSlack(
    message, 
    preference.slackChannelId,
    [{
      color: "#FF0000",
      title: "AI Analysis Detected Anomaly",
      text: anomalyData.description,
      fields: [
        { title: "Confidence", value: `${anomalyData.confidence}%`, short: true },
        { title: "Detected At", value: new Date().toLocaleString(), short: true }
      ]
    }]
  );

  if (result) {
    toast({
      title: "Anomaly Alert Sent",
      description: "Notification sent to Slack channel successfully",
    });
  }

  return result;
};

// Send daily AI analysis summary
export const sendDailySummary = async (
  summaryData: { date: string; anomalies: number; predictions: any[]; insights: string[] }
): Promise<boolean> => {
  const config = getSlackConfig();
  const preference = config.notificationPreferences.find(p => p.type === 'daily_summaries');
  
  if (!preference?.enabled) return false;
  
  const message = `📊 *DAILY AI ANALYSIS SUMMARY*: ${summaryData.date}\n${summaryData.anomalies} anomalies detected\n${summaryData.insights.length} key insights identified`;
  
  const fields = summaryData.insights.map((insight, index) => {
    return { title: `Insight ${index + 1}`, value: insight, short: false };
  });

  const result = await sendToSlack(
    message, 
    preference.slackChannelId,
    [{
      color: "#36a64f",
      title: "Daily AI Analysis Summary",
      text: `Summary for ${summaryData.date}`,
      fields: [
        { title: "Anomalies Detected", value: summaryData.anomalies.toString(), short: true },
        { title: "Generated At", value: new Date().toLocaleString(), short: true },
        ...fields
      ]
    }]
  );

  if (result) {
    toast({
      title: "Daily Summary Sent",
      description: "AI analysis summary sent to Slack channel successfully",
    });
  }

  return result;
};

// Send task notification to field teams
export const sendTaskNotification = async (task: Task): Promise<boolean> => {
  const config = getSlackConfig();
  const preference = config.notificationPreferences.find(p => p.type === 'task_notifications');
  
  if (!preference?.enabled) return false;
  
  const priorityEmoji = task.priority === 'urgent' ? '🔴' : 
                        task.priority === 'high' ? '🟠' : 
                        task.priority === 'medium' ? '🟡' : '🔵';
  
  const message = `${priorityEmoji} *TASK ASSIGNMENT*: ${task.title}\n${task.description}\nDue: ${new Date(task.dueDate).toLocaleDateString()}`;
  
  const result = await sendToSlack(
    message, 
    preference.slackChannelId,
    [{
      color: task.priority === 'urgent' ? "#FF0000" :
             task.priority === 'high' ? "#FFA500" :
             task.priority === 'medium' ? "#FFFF00" : "#0000FF",
      title: "New Task Assignment",
      text: task.description,
      fields: [
        { title: "Status", value: task.status, short: true },
        { title: "Priority", value: task.priority, short: true },
        { title: "Due Date", value: new Date(task.dueDate).toLocaleDateString(), short: true },
        { title: "Assigned To", value: task.assignedTo.join(", "), short: true }
      ]
    }]
  );

  if (result) {
    toast({
      title: "Task Notification Sent",
      description: "Task details sent to field team via Slack",
    });
  }

  return result;
};

// Share file via Slack
export const shareFileViaSlack = async (
  fileData: { name: string; url: string; type: string; description?: string }
): Promise<boolean> => {
  const config = getSlackConfig();
  const preference = config.notificationPreferences.find(p => p.type === 'file_sharing');
  
  if (!preference?.enabled) return false;
  
  const message = `📎 *FILE SHARED*: ${fileData.name}\n${fileData.description || 'No description provided'}`;
  
  const result = await sendToSlack(
    message, 
    preference.slackChannelId,
    [{
      color: "#3AA3E3",
      title: fileData.name,
      text: fileData.description || 'No description provided',
      fields: [
        { title: "File Type", value: fileData.type, short: true },
        { title: "Shared At", value: new Date().toLocaleString(), short: true }
      ],
      actions: [
        {
          type: "button",
          text: "Download File",
          url: fileData.url
        }
      ]
    }]
  );

  if (result) {
    toast({
      title: "File Shared",
      description: "File shared via Slack successfully",
    });
  }

  return result;
};
