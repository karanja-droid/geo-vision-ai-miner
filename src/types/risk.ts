
import { GeoPoint } from './geo';
import { StakeholderOrganization } from './organizations';

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
