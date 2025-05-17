
import { getSlackConfig } from "../../slack/config";
import { sendToSlack } from "../../slack/sender";

// Handle performance issues
export function handlePerformanceIssue(
  message: string,
  type: string,
  details: Record<string, any> = {}
) {
  const config = getSlackConfig();
  
  if (!config.enabled || !config.monitoringSettings?.performanceMonitoring) {
    return;
  }
  
  // Check against performance threshold
  if (type === 'task' && details.duration < config.monitoringSettings.performanceThreshold) {
    return; // Under threshold, don't alert
  }
  
  // Get the channel ID
  const channelId = config.monitoringSettings.alertChannel || 'monitoring-alerts';
  
  try {
    // Format the message for Slack
    const slackMessage = `🟡 *PERFORMANCE ISSUE*: ${message}`;
    
    // Create attachment with details
    const attachment = {
      color: '#FFD700',
      title: 'Performance Issue Details',
      fields: [
        { title: "Type", value: type, short: true },
        { title: "Location", value: window.location.href, short: true },
        { title: "Timestamp", value: new Date().toLocaleString(), short: true },
        ...Object.entries(details).map(([key, value]) => ({
          title: key,
          value: String(value),
          short: true
        }))
      ]
    };
    
    sendToSlack(slackMessage, channelId, [attachment]);
    
  } catch (err) {
    console.error('Failed to send performance alert to Slack:', err);
  }
}
