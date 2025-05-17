
import { ErrorDetails } from '../../../types/monitoring';
import { getSlackConfig } from '../../slack/config';
import { sendToSlack } from '../../slack/sender';

export const sendErrorAlert = async (
  errorMessage: string,
  errorType: 'error' | 'warning',
  details?: Record<string, any>
): Promise<boolean> => {
  const config = getSlackConfig();
  
  if (!config.enabled || !config.monitoringSettings?.errorMonitoring) {
    return false;
  }
  
  if (errorType === 'warning' && !config.monitoringSettings.monitorWarnings) {
    return false;
  }
  
  // Format message for Slack
  const emoji = errorType === 'error' ? '🚨' : '⚠️';
  const message = `${emoji} *${errorType.toUpperCase()}*: ${errorMessage}`;
  
  // Add beta program tag if this is coming from a beta user
  const isBetaUser = details?.sessionId?.toString().startsWith('beta_') || 
                    details?.userName?.toString().includes('beta') ||
                    window.location.hostname.includes('beta');
  
  const betaTag = isBetaUser ? ' [BETA]' : '';
  
  // Create attachments for the alert
  const attachments = [{
    color: errorType === 'error' ? '#FF0000' : '#FFA500',
    title: `${errorType.toUpperCase()}${betaTag}: ${errorMessage}`,
    text: details ? JSON.stringify(details, null, 2) : 'No additional details provided',
    fields: [
      { title: 'Timestamp', value: new Date().toISOString(), short: true },
      { title: 'Type', value: errorType, short: true },
      { title: 'Source', value: details?.source || window.location.pathname, short: true },
      { title: 'User', value: details?.userName || 'Unknown', short: true }
    ]
  }];
  
  // Determine alert channel based on error type and beta status
  const alertChannel = isBetaUser ? 'beta-alerts' : config.monitoringSettings.alertChannel;
  
  return sendToSlack(message, alertChannel, attachments);
};

// Send collected error details to Slack (for batch processing)
export const sendErrorDetailsReport = async (
  errors: ErrorDetails[],
  summaryPeriod: string = '1 hour'
): Promise<boolean> => {
  const config = getSlackConfig();
  
  if (!config.enabled || !config.monitoringSettings?.errorMonitoring) {
    return false;
  }
  
  const errorCount = errors.filter(e => e.type === 'error').length;
  const warningCount = errors.filter(e => e.type === 'warning').length;
  
  // Don't send empty reports
  if (errorCount + warningCount === 0) {
    return false;
  }
  
  const message = `📊 *Error Report (Last ${summaryPeriod})*\n${errorCount} errors, ${warningCount} warnings detected`;
  
  // Group errors by type for better readability
  const groupedErrors: Record<string, ErrorDetails[]> = {};
  errors.forEach(error => {
    const key = `${error.type}-${error.message}`;
    if (!groupedErrors[key]) {
      groupedErrors[key] = [];
    }
    groupedErrors[key].push(error);
  });
  
  // Create summary attachment
  const attachment = {
    color: errorCount > 0 ? '#FF0000' : '#FFA500',
    title: `System Health Report (Last ${summaryPeriod})`,
    fields: []
  };
  
  // Add fields for each error group
  Object.entries(groupedErrors).forEach(([key, items]) => {
    const [type, ...messageParts] = key.split('-');
    const message = messageParts.join('-');
    
    attachment.fields.push({
      title: `${type === 'error' ? '❌' : '⚠️'} ${message}`,
      value: `${items.length} occurrences${items[0].source ? ` (in ${items[0].source})` : ''}`,
      short: false
    });
  });
  
  // Combine with beta metrics if available
  const betaErrors = errors.filter(e => {
    return e.userId?.toString().startsWith('beta_') || 
           e.userName?.toString().includes('beta') ||
           e.source?.toString().includes('beta');
  });
  
  if (betaErrors.length > 0) {
    attachment.fields.push({
      title: '🧪 Beta Program Errors',
      value: `${betaErrors.length} errors/warnings from beta users`,
      short: true
    });
  }
  
  return sendToSlack(message, config.monitoringSettings.alertChannel, [attachment]);
};
