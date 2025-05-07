
import { GeoPoint } from './geo';
import { StakeholderOrganization } from './datasets';

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
