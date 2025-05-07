
import { StakeholderOrganization } from './datasets';

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
