
// Main entry point for Slack integration
// Re-export all functions from the smaller files

import { getSlackConfig, saveSlackConfig } from "./slack/config";
import { sendToSlack } from "./slack/sender";
import { 
  sendAnomalyAlert, 
  sendDailySummary, 
  sendTaskNotification, 
  shareFileViaSlack 
} from "./slack/notifications";

export {
  // Config functions
  getSlackConfig,
  saveSlackConfig,
  
  // Messaging functions
  sendToSlack,
  
  // Notification functions
  sendAnomalyAlert,
  sendDailySummary,
  sendTaskNotification,
  shareFileViaSlack
};
