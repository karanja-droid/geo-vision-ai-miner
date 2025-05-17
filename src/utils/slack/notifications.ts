
import { toast } from "@/hooks/use-toast";
import { Task } from "@/types";
import { getSlackConfig } from "./config";
import { sendToSlack } from "./sender";
import { AnomalyAlertData, AnalysisCompletionData } from "./types";

// Define missing types
interface DailySummaryData {
  date: string;
  anomalies: number;
  predictions: Array<{
    area: string;
    probability: number;
  }>;
  insights: string[];
}

interface FileShareData {
  name: string;
  url: string;
  type: string;
  description?: string;
}

// Send anomaly detection alert to Slack
export const sendAnomalyAlert = async (
  anomalyData: AnomalyAlertData
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
  summaryData: DailySummaryData
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
  fileData: FileShareData
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

// Documentation comments to explain the webhook integration process
/**
 * Slack Integration Webhook Guide:
 * 
 * 1. Create a Slack App:
 *    - Go to https://api.slack.com/apps and click "Create New App"
 *    - Choose "From scratch" and provide a name and workspace
 * 
 * 2. Set up Incoming Webhooks:
 *    - In your Slack App settings, navigate to "Incoming Webhooks"
 *    - Toggle "Activate Incoming Webhooks" to On
 *    - Click "Add New Webhook to Workspace"
 *    - Select the channel where messages will be posted
 * 
 * 3. Copy the Webhook URL:
 *    - After authorizing, you'll see a Webhook URL generated
 *    - Copy this URL to use in the platform's Slack integration settings
 * 
 * 4. Test the Connection:
 *    - Use the "Test Connection" button in the platform to verify
 *    - A test message should appear in your selected Slack channel
 * 
 * For advanced configuration, you can create different webhooks for different channels
 * and assign specific notification types to specific channels through the platform.
 */
