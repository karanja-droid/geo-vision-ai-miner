
import { getSlackConfig } from "../../slack/config";
import { handleWindowError } from "../handlers/errorHandlers";
import { handleUnhandledRejection } from "../handlers/errorHandlers";
import { initPerformanceMonitoring } from "./performanceMonitoring";

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

export function shouldSendErrorAlert(errorMessage: string): boolean {
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

// Importing from our new modules
import { sendErrorAlert } from "../alerts/errorAlerts";
