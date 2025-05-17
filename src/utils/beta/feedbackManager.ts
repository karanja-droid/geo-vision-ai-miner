
import { BetaFeedbackData } from "../slack/types";
import { sendToSlack } from "../slack/sender";
import { getSlackConfig } from "../slack/config";

/**
 * Submit beta feedback to Slack
 */
export const SubmitFeedbackToSlack = async (feedback: Omit<BetaFeedbackData, "screenshots">): Promise<boolean> => {
  const config = getSlackConfig();
  
  if (!config.enabled) {
    console.warn("Slack integration is not enabled. Feedback was not sent.");
    return false;
  }
  
  // Prepare the message for Slack
  const feedbackTypeEmoji = getFeedbackTypeEmoji(feedback.type);
  const message = `${feedbackTypeEmoji} *New Beta Feedback*: ${feedback.module}`;
  
  // Create rich attachments for Slack
  const attachments = [{
    color: getFeedbackTypeColor(feedback.type),
    title: `Feedback: ${feedback.module}`,
    text: feedback.text,
    fields: [
      { title: "Type", value: feedback.type, short: true },
      { title: "Module", value: feedback.module, short: true },
      { title: "Priority", value: feedback.priority || "medium", short: true },
      { title: "Timestamp", value: new Date(feedback.timestamp).toLocaleString(), short: true }
    ]
  }];
  
  // Send to the beta-feedback channel or fall back to a default channel
  const channel = "beta-feedback";
  
  try {
    const result = await sendToSlack(message, channel, attachments);
    return result;
  } catch (error) {
    console.error("Failed to send beta feedback to Slack:", error);
    return false;
  }
};

/**
 * Get emoji based on feedback type
 */
const getFeedbackTypeEmoji = (type: string): string => {
  switch (type) {
    case "bug":
      return "🐛";
    case "feature":
      return "✨";
    case "experience":
      return "💡";
    case "performance":
      return "⚡";
    default:
      return "📝";
  }
};

/**
 * Get color for Slack attachment based on feedback type
 */
const getFeedbackTypeColor = (type: string): string => {
  switch (type) {
    case "bug":
      return "#E53E3E"; // Red
    case "feature":
      return "#3182CE"; // Blue
    case "experience":
      return "#38A169"; // Green
    case "performance":
      return "#DD6B20"; // Orange
    default:
      return "#718096"; // Gray
  }
};
