
import { SlackIntegration, Task } from "@/types";

export interface AnomalyAlertData {
  title: string;
  description: string;
  confidence: number;
  location?: string;
}

export interface DailySummaryData {
  date: string;
  anomalies: number;
  predictions: any[];
  insights: string[];
}

export interface FileShareData {
  name: string;
  url: string;
  type: string;
  description?: string;
}
