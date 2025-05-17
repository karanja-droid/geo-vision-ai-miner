
import { toast } from "@/hooks/use-toast";
import { getSlackConfig } from "../../slack/config";
import { sendToSlack } from "../../slack/sender";

// Send error to Slack if monitoring is enabled
export async function sendErrorAlert(
  message: string,
  level: 'error' | 'warning' = 'error',
  details: Record<string, any> = {}
) {
  const config = getSlackConfig();
  
  if (!config.enabled || !config.webhookUrl || !config.monitoringSettings?.errorMonitoring) {
    return;
  }
  
  // Get the threshold
  const errorThreshold = config.monitoringSettings.errorThreshold || 5;
  
  // Get the channel ID
  const channelId = config.monitoringSettings.alertChannel || 'monitoring-alerts';
  
  try {
    // Format the message for Slack
    const emoji = level === 'error' ? '🔴' : '🟠';
    const slackMessage = `${emoji} *${level.toUpperCase()}*: ${message}`;
    
    // Create attachment with details
    const attachment = {
      color: level === 'error' ? '#FF0000' : '#FFA500',
      title: level === 'error' ? 'Error Details' : 'Warning Details',
      fields: [
        { title: "Location", value: window.location.href, short: true },
        { title: "Timestamp", value: new Date().toLocaleString(), short: true },
        ...Object.entries(details).map(([key, value]) => ({
          title: key,
          value: String(value).substring(0, 100), // Truncate very long values
          short: false
        }))
      ]
    };
    
    await sendToSlack(slackMessage, channelId, [attachment]);
    
  } catch (err) {
    // Don't use sendErrorAlert here to avoid infinite loop
    console.error('Failed to send error alert to Slack:', err);
  }
}
