
import { StakeholderOrganization } from './organizations';

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
