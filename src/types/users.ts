
import { StakeholderOrganization } from './datasets';

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

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  organization?: StakeholderOrganization;
}
