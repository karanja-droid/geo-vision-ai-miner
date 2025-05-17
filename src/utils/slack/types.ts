
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

export type SlackNotificationType = 'anomaly_alert' | 'analysis_completion' | 'system_issue';
