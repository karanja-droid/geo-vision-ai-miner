
import { StakeholderOrganization } from './organizations';

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
