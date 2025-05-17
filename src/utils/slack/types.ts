
// Types for Slack notifications

export interface AnomalyAlertData {
  title: string;
  description: string;
  confidence: number;
  location?: string;
  anomalyId?: string;
  detectedBy?: 'ai' | 'user' | 'system';
  severity?: 'low' | 'medium' | 'high' | 'critical';
  mineralType?: string; // Added for analysis alerts
}

export interface DailySummaryData {
  date: string;
  anomalies: number;
  insights: string[];
  datasets?: {
    processed: number;
    new: number;
  };
  performance?: {
    avgResponseTime: number;
    errorRate: number;
  };
}

export interface FileShareData {
  name: string;
  type: string;
  url: string;
  description?: string;
  size?: number;
  author?: string;
  relatedDataset?: string;
}

export interface BetaFeedbackData {
  feedbackId: string;
  type: 'bug' | 'feature' | 'experience' | 'performance';
  text: string;
  module: string;
  user?: string;
  timestamp: string;
  priority?: 'low' | 'medium' | 'high';
  screenshots?: string[];
}

export interface BetaMetricsData {
  activeUsers: number;
  sessionsToday: number;
  averageSessionTime: number;
  topFeatures: {
    feature: string;
    usageCount: number;
  }[];
  errorRate: number;
  feedbackCount: {
    bugs: number;
    features: number;
    experience: number;
    performance: number;
  };
}

export interface BetaAnnouncementData {
  title: string;
  message: string;
  features: string[];
  releaseDate?: string;
  targetGroups?: string[];
}

// Added for beta communications
export interface AnalysisCompletionData {
  analysisId: string;
  title: string;
  description: string;
  duration: number;
  resultSummary: string;
  accuracy?: number;
  anomalies?: number;
  datasetName: string;
  mineralType?: string;
}

