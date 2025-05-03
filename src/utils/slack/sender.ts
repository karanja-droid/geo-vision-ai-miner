
import { toast } from "@/hooks/use-toast";
import { getSlackConfig } from "./config";

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
