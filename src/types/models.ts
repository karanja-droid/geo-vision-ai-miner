
export interface ModelInfo {
  id: string;
  name: string;
  type: 'predictive' | 'computer-vision' | 'reinforcement' | 'random-forest' | 'cnn' | 'geostatistical';
  target: string;
  accuracy: number;
  lastTrained: string;
  description?: string;
  feedbackIncorporated?: boolean;
}
