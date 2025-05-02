
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
  stakeholderAccess?: import('./organizations').StakeholderOrganization[];
}
