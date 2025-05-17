
import { getSlackConfig } from "../../slack/config";
import { sendErrorAlert } from "../alerts/errorAlerts";

// Window error event handler
export function handleWindowError(event: ErrorEvent) {
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
export function handleUnhandledRejection(event: PromiseRejectionEvent) {
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

// Console warning handler
export function handleConsoleWarning(message: string, ...args: any[]) {
  const config = getSlackConfig();
  if (config.enabled && config.monitoringSettings?.monitorWarnings) {
    sendErrorAlert(
      `Console Warning: ${message}`,
      'warning',
      {
        arguments: JSON.stringify(args),
        timestamp: new Date().toISOString(),
      }
    );
  }
}
