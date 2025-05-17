
// Re-export all monitoring modules
import { initErrorMonitoring } from './core/initErrorMonitoring';
import { sendErrorAlert } from './alerts/errorAlerts';
import { handleWindowError, handleUnhandledRejection } from './handlers/errorHandlers';
import { initPerformanceMonitoring } from './core/performanceMonitoring';
import { handlePerformanceIssue } from './performance/performanceHandlers';

// Export the public API
export const monitoringExports = {
  initErrorMonitoring,
  sendErrorAlert,
  handleWindowError,
  handleUnhandledRejection,
  initPerformanceMonitoring,
  handlePerformanceIssue
};

// For backward compatibility
export { initErrorMonitoring, sendErrorAlert };
