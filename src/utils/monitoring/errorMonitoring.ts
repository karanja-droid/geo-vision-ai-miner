import { toast } from "@/hooks/use-toast";
import { getSlackConfig } from "../slack/config";
import { sendToSlack } from "../slack/sender";
import { handleError } from "../errorHandler";

// Global error monitoring initialization
export const initErrorMonitoring = () => {
  // Save original console methods
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  
  // Override console.error
  console.error = (...args: any[]) => {
    // Call original method
    originalConsoleError(...args);
    
    // Parse the error
    const errorMessage = args.map(arg => {
      if (arg instanceof Error) {
        return arg.message;
      }
      return String(arg);
    }).join(' ');
    
    // Check if monitoring is enabled before sending
    const config = getSlackConfig();
    if (config.enabled && 
        config.monitoringSettings?.errorMonitoring && 
        shouldSendErrorAlert(errorMessage)) {
      sendErrorAlert(errorMessage, 'error', {
        stack: args.find(arg => arg instanceof Error)?.stack,
        timestamp: new Date().toISOString(),
      });
    }
  };
  
  // Override console.warn
  console.warn = (...args: any[]) => {
    // Call original method
    originalConsoleWarn(...args);
    
    // Only monitor warnings if specifically enabled
    const config = getSlackConfig();
    if (config.enabled && 
        config.monitoringSettings?.errorMonitoring && 
        config.monitoringSettings?.monitorWarnings === true) { // Check if explicitly true
      const warningMessage = args.map(arg => String(arg)).join(' ');
      sendErrorAlert(warningMessage, 'warning');
    }
  };
  
  // Set up window error and unhandled promise rejection handlers
  window.addEventListener('error', handleWindowError);
  window.addEventListener('unhandledrejection', handleUnhandledRejection);
  
  // Set up performance monitoring if enabled
  const config = getSlackConfig();
  if (config.enabled && config.monitoringSettings?.performanceMonitoring) {
    initPerformanceMonitoring();
  }
  
  console.log('Error monitoring initialized');
};

// Error debouncing - avoid sending too many similar errors
const errorCache = new Map<string, { count: number, lastSent: number }>();

function shouldSendErrorAlert(errorMessage: string): boolean {
  // Simple algorithm to avoid duplicate errors
  const key = errorMessage.substring(0, 100); // Use start of message as key
  const now = Date.now();
  const cached = errorCache.get(key);
  
  // If we've never seen this error, or it was a while ago, we should send it
  if (!cached || (now - cached.lastSent > 60000)) { // 1 minute
    errorCache.set(key, { count: 1, lastSent: now });
    return true;
  }
  
  // Increment counter
  cached.count++;
  
  // If we've seen this error a lot, only send occasionally
  if (cached.count % 10 === 0) { // Send every 10th occurrence
    cached.lastSent = now;
    return true;
  }
  
  return false;
}

// Window error event handler
function handleWindowError(event: ErrorEvent) {
  const config = getSlackConfig();
  if (config.enabled && config.monitoringSettings?.errorMonitoring) {
    sendErrorAlert(
      event.message || 'Unknown error',
      'error',
      {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        timestamp: new Date().toISOString(),
      }
    );
  }
}

// Unhandled promise rejection handler
function handleUnhandledRejection(event: PromiseRejectionEvent) {
  const config = getSlackConfig();
  if (config.enabled && config.monitoringSettings?.errorMonitoring) {
    let message = 'Unhandled Promise Rejection';
    let details = {};
    
    if (event.reason instanceof Error) {
      message = event.reason.message;
      details = {
        stack: event.reason.stack,
        timestamp: new Date().toISOString(),
      };
    } else if (typeof event.reason === 'string') {
      message = event.reason;
    }
    
    sendErrorAlert(message, 'error', details);
  }
}

// Send error to Slack if monitoring is enabled
async function sendErrorAlert(
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

// Initialize performance monitoring
function initPerformanceMonitoring() {
  if ('PerformanceObserver' in window) {
    try {
      // Observe large layout shifts
      const layoutObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && (entry as any).value > 0.1) {
            handlePerformanceIssue('Large layout shift detected', 'layout', {
              value: (entry as any).value,
              url: window.location.href
            });
          }
        }
      });
      layoutObserver.observe({ type: 'layout-shift', buffered: true });
      
      // Observe long tasks
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // 50ms threshold for long tasks
            handlePerformanceIssue('Long task detected', 'task', {
              duration: entry.duration,
              url: window.location.href
            });
          }
        }
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
      
      // More performance monitoring can be added here
      
    } catch (err) {
      console.error('Error setting up performance monitoring:', err);
    }
  }
}

// Handle performance issues
function handlePerformanceIssue(
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

export const monitoringExports = {
  initErrorMonitoring,
  sendErrorAlert
};
