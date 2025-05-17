
import { handleUnhandledRejection, handleWindowError, handleConsoleWarning } from "../handlers/errorHandlers";
import { getSlackConfig } from "../../slack/config";

// Initialize error monitoring
export function initErrorMonitoring() {
  // Set up event listeners for error handling
  window.addEventListener('error', handleWindowError);
  window.addEventListener('unhandledrejection', handleUnhandledRejection);
  
  // Store original console methods
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  
  // Override console.error
  console.error = (...args) => {
    // Call the original method
    originalConsoleError.apply(console, args);
    
    // Extract error information
    let errorMessage = 'Console Error';
    let errorDetails = {};
    
    if (args.length > 0) {
      if (args[0] instanceof Error) {
        errorMessage = args[0].message;
        errorDetails = {
          stack: args[0].stack,
          timestamp: new Date().toISOString()
        };
      } else if (typeof args[0] === 'string') {
        errorMessage = args[0];
        errorDetails = {
          additionalArgs: args.slice(1),
          timestamp: new Date().toISOString()
        };
      }
      
      // Send to monitoring
      const config = getSlackConfig();
      if (config.enabled && config.monitoringSettings?.errorMonitoring) {
        // Import and use sendErrorAlert only if monitoring is enabled
        const { sendErrorAlert } = require('../alerts/errorAlerts');
        sendErrorAlert(errorMessage, 'error', errorDetails);
      }
    }
  };
  
  // Override console.warn for warning monitoring
  console.warn = (...args) => {
    // Call the original method first
    originalConsoleWarn.apply(console, args);
    
    // Check if warning monitoring is enabled
    const config = getSlackConfig();
    if (config.enabled && config.monitoringSettings?.monitorWarnings) {
      // Extract warning message
      const warningMessage = args.length > 0 && typeof args[0] === 'string' 
        ? args[0] 
        : 'Console Warning';
        
      // Call the warning handler
      handleConsoleWarning(warningMessage, ...args.slice(1));
    }
  };
  
  // Return cleanup function
  return () => {
    window.removeEventListener('error', handleWindowError);
    window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
  };
}
