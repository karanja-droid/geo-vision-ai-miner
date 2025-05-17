
export interface MonitoringSettings {
  errorMonitoring: boolean;
  performanceMonitoring: boolean;
  apiMonitoring: boolean;
  errorThreshold: number;
  performanceThreshold: number; // in milliseconds
  alertChannel: string;
  alertFrequency: 'immediate' | 'hourly' | 'daily';
}

export interface MonitoringEvent {
  id: string;
  timestamp: string;
  eventType: 'error' | 'performance' | 'api' | 'security';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  source: string;
  metadata?: Record<string, any>;
}

// Update the SlackIntegration type to include monitoring settings
declare module './communication' {
  interface SlackIntegration {
    monitoringSettings?: MonitoringSettings;
  }
}
