
export interface GeoPoint {
  id: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  properties?: Record<string, any>;
}

export interface DataLayer {
  id: string;
  name: string;
  type: 'raster' | 'vector' | 'point' | 'heatmap';
  visible: boolean;
  opacity: number;
  data: any;
}

export interface AnalysisResult {
  id: string;
  layerId: string;
  timestamp: string;
  modelType: 'prediction' | 'classification' | 'anomaly';
  confidence: number;
  data: any;
  mineralType?: 'copper' | 'cobalt' | 'gold' | 'iron' | 'zinc' | 'unknown';
}

export interface DatasetInfo {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  description?: string;
  source?: string;
  organization?: StakeholderOrganization;
  validated?: boolean;
  contributors?: string[];
}

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

// Enhanced types for role-based access control
export type UserRole = 
  | 'geologist' 
  | 'drill-team' 
  | 'government' 
  | 'investor' 
  | 'admin'
  | 'geological-survey'
  | 'mining-company'
  | 'remote-sensing'
  | 'environmental'
  | 'academic';

export type StakeholderOrganization = 
  | 'Geological Survey Department'
  | 'Mining Company'
  | 'Remote Sensing Agency'
  | 'Environmental Regulator'
  | 'Academic Institution'
  | 'Government Agency'
  | 'Investment Firm'
  | 'Other';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  organization?: StakeholderOrganization;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  status: 'pending' | 'in-progress' | 'completed' | 'review';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  aiTriggered?: boolean;
  triggeredBy?: string;
  conflictStatus?: 'none' | 'flagged' | 'resolving' | 'resolved';
  stakeholders?: StakeholderOrganization[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  userId: string;
  relatedTask?: string;
  workflowTriggered?: boolean;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId?: string;
  channelId?: string;
  attachments?: string[];
  createdAt: string;
  read: boolean;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  members: string[];
  createdAt: string;
  lastActivity: string;
  stakeholderAccess?: StakeholderOrganization[];
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: string;
  tags?: string[];
  organization?: StakeholderOrganization;
  accessRights?: UserRole[];
}

// New interfaces for AI/ML implementation
export interface MineralProspectivityMap {
  id: string;
  name: string;
  mineralType: 'copper' | 'cobalt' | 'gold' | 'iron' | 'zinc' | 'other';
  confidence: number;
  generatedAt: string;
  features: {
    geological: boolean;
    geochemical: boolean;
    remoteSensing: boolean;
  };
  modelType: string;
  dataSourceIds: string[];
}

export interface DrillRecommendation {
  id: string;
  location: GeoPoint;
  priority: 'low' | 'medium' | 'high';
  expectedMineralType: 'copper' | 'cobalt' | 'gold' | 'iron' | 'zinc' | 'unknown';
  expectedGrade: number;
  depth: number;
  costEstimate: number;
  createdAt: string;
  aiConfidence: number;
}

export interface RiskAssessment {
  id: string;
  type: 'environmental' | 'social' | 'regulatory' | 'operational';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedArea: GeoPoint;
  mitigationSuggestions: string[];
  stakeholdersInvolved: StakeholderOrganization[];
  createdAt: string;
}

export interface Workflow {
  id: string;
  name: string;
  status: 'inactive' | 'active' | 'completed' | 'failed';
  steps: WorkflowStep[];
  createdAt: string;
  updatedAt: string;
  triggeredBy: 'ai' | 'user' | 'schedule';
  stakeholdersInvolved: StakeholderOrganization[];
}

export interface WorkflowStep {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  assignedTo?: string[];
  dueDate?: string;
  dependsOn?: string[];
  completedAt?: string;
}

export interface Conflict {
  id: string;
  type: 'claim-overlap' | 'regulatory' | 'environmental' | 'stakeholder';
  severity: 'low' | 'medium' | 'high';
  description: string;
  partiesInvolved: StakeholderOrganization[];
  status: 'identified' | 'reviewing' | 'resolving' | 'resolved';
  resolutionSuggestions?: string[];
  createdAt: string;
  updatedAt: string;
}
