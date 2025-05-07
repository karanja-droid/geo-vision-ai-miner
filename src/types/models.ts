
export interface ModelInfo {
  id: string;
  name: string;
  type: 'predictive' | 'computer-vision' | 'reinforcement' | 'random-forest' | 'cnn' | 'geostatistical';
  target: string;
  accuracy: number;
  lastTrained: string;
  description?: string;
  feedbackIncorporated?: boolean;
  regionSpecialization?: 'global' | 'africa' | 'north-america' | 'south-america' | 'europe' | 'asia' | 'australia';
  mineralTypes?: ('gold' | 'copper' | 'cobalt' | 'diamond' | 'iron' | 'platinum' | 'lithium' | 'manganese' | 'zinc')[];
}

export interface AfricanDepositSignature {
  mineralType: 'gold' | 'copper' | 'cobalt' | 'diamond' | 'iron' | 'platinum' | 'lithium' | 'manganese' | 'zinc';
  spectralSignature: string[];
  geologicalIndicators: string[];
  confidenceThreshold: number;
}

