
// Don't re-export StakeholderOrganization since it's already defined in datasets.ts
// Instead, import it from datasets.ts if needed within this file

// If there are other types specific to organizations, they should be defined here
// For example:
export interface OrganizationMember {
  id: string;
  name: string;
  role: string;
  email: string;
  joinDate: string;
}

export interface OrganizationProject {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'on-hold';
}
