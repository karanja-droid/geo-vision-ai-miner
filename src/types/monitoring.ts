
export interface MonitoringSettings {
  errorMonitoring: boolean;
  performanceMonitoring: boolean;
  apiMonitoring: boolean;
  errorThreshold: number;
  performanceThreshold: number; // in milliseconds
  alertChannel: string;
  alertFrequency: 'immediate' | 'hourly' | 'daily';
  monitorWarnings: boolean;
}

export interface ErrorDetails {
  message: string;
  type: 'error' | 'warning';
  details?: Record<string, any>;
  timestamp: string;
  source?: string;
  userId?: string;
  userName?: string;
  sessionId?: string;
  url?: string;
  browser?: string;
  os?: string;
}

export interface PerformanceMetrics {
  pageLoadTime?: number; // milliseconds
  responseTime?: number; // milliseconds
  resourceLoadTime?: number; // milliseconds
  apiLatency?: number; // milliseconds
  memoryUsage?: number; // bytes
  cpuUsage?: number; // percentage
  timestamp: string;
  path: string;
}
