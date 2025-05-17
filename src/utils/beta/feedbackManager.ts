
import { toast } from "@/hooks/use-toast";
import { sendDirectMessage } from "../slack/communication";

export interface BetaFeedback {
  id: string;
  type: 'bug' | 'feature' | 'experience' | 'performance';
  text: string;
  moduleId?: string;
  moduleName?: string;
  timestamp: string;
  userId?: string;
  userName?: string;
  metadata?: Record<string, any>;
  status?: 'new' | 'reviewing' | 'implemented' | 'declined';
}

const STORAGE_KEY = 'betaFeedback';

// Save feedback to local storage and send to slack if configured
export const saveFeedback = async (feedback: Omit<BetaFeedback, 'id' | 'timestamp' | 'status'>): Promise<BetaFeedback> => {
  const id = `feedback_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const timestamp = new Date().toISOString();
  
  const newFeedback: BetaFeedback = {
    ...feedback,
    id,
    timestamp,
    status: 'new'
  };
  
  try {
    // Save to local storage
    const existingFeedback: BetaFeedback[] = getFeedbackItems();
    existingFeedback.push(newFeedback);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingFeedback));
    
    // Send to Slack if applicable
    if (feedback.moduleId && feedback.moduleName) {
      const slackChannel = 'beta-feedback';
      const feedbackMessage = `*Beta Feedback - ${feedback.type}*\n*Module:* ${feedback.moduleName} (${feedback.moduleId})\n*User:* ${feedback.userName || 'Anonymous'}\n\n${feedback.text}\n\n_Submitted from beta application_`;
      
      await sendDirectMessage(feedbackMessage, slackChannel);
    }
    
    return newFeedback;
  } catch (error) {
    console.error('Error saving feedback:', error);
    throw new Error('Failed to save feedback');
  }
};

// Get all feedback items from local storage
export const getFeedbackItems = (): BetaFeedback[] => {
  try {
    const storedFeedback = localStorage.getItem(STORAGE_KEY);
    return storedFeedback ? JSON.parse(storedFeedback) : [];
  } catch (error) {
    console.error('Error retrieving feedback:', error);
    return [];
  }
};

// Get feedback items for a specific module
export const getModuleFeedback = (moduleId: string): BetaFeedback[] => {
  return getFeedbackItems().filter(item => item.moduleId === moduleId);
};

// Update feedback status
export const updateFeedbackStatus = (
  feedbackId: string, 
  status: BetaFeedback['status'],
  response?: string
): boolean => {
  try {
    const feedbackItems = getFeedbackItems();
    const itemIndex = feedbackItems.findIndex(item => item.id === feedbackId);
    
    if (itemIndex >= 0) {
      feedbackItems[itemIndex].status = status;
      
      if (response) {
        feedbackItems[itemIndex].metadata = {
          ...feedbackItems[itemIndex].metadata,
          response,
          responseDate: new Date().toISOString()
        };
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackItems));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error updating feedback status:', error);
    return false;
  }
};

// Export feedback data in various formats
export const exportFeedback = (format: 'json' | 'csv') => {
  const feedbackItems = getFeedbackItems();
  
  if (feedbackItems.length === 0) {
    toast({
      title: "No feedback to export",
      description: "There is no feedback data available to export."
    });
    return null;
  }
  
  if (format === 'json') {
    const jsonString = JSON.stringify(feedbackItems, null, 2);
    return downloadFile(jsonString, 'beta-feedback.json', 'application/json');
  } else if (format === 'csv') {
    const headers = ['id', 'type', 'text', 'moduleId', 'moduleName', 'timestamp', 'userId', 'userName', 'status'];
    const csvRows = [headers.join(',')];
    
    for (const item of feedbackItems) {
      const row = headers.map(header => {
        const value = item[header as keyof BetaFeedback];
        // Handle text fields that might contain commas
        if (typeof value === 'string' && (header === 'text' || value.includes(','))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      });
      
      csvRows.push(row.join(','));
    }
    
    return downloadFile(csvRows.join('\n'), 'beta-feedback.csv', 'text/csv');
  }
};

// Helper to download a file
const downloadFile = (content: string, fileName: string, contentType: string) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
};
