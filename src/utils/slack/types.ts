

export interface AnomalyAlertData {
  title: string;
  description: string;
  confidence: number;
  location: string;
  severity: 'low' | 'medium' | 'high'; // Added severity property
  mineralType: string;
}

export interface AnalysisCompletionData {
  title: string;
  description: string;
  runtime: number;
  location: string;
  analysisType: string;
  resultSummary: string;
}

// Add the missing types that were referenced in notifications.ts
export interface DailySummaryData {
  date: string;
  anomalies: number;
  predictions: Array<{
    area: string;
    probability: number;
  }>;
  insights: string[];
}

export interface FileShareData {
  name: string;
  url: string;
  type: string;
  description?: string;
}

export type SlackNotificationType = 'anomaly_alert' | 'analysis_completion' | 'system_issue';
