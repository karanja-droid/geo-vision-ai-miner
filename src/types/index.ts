
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
}

export interface ModelInfo {
  id: string;
  name: string;
  type: 'predictive' | 'computer-vision' | 'reinforcement';
  target: string;
  accuracy: number;
  lastTrained: string;
  description?: string;
}

// New interfaces for role-based access control
export type UserRole = 'geologist' | 'drill-team' | 'government' | 'investor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
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
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  userId: string;
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
}
