
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Building, Map, BookOpen, BadgeCheck } from 'lucide-react';
import { StakeholderOrganization } from '@/types';

interface OrganizationFilterProps {
  selectedOrganization: StakeholderOrganization | 'all';
  setSelectedOrganization: (org: StakeholderOrganization | 'all') => void;
  organizations: StakeholderOrganization[];
}

const OrganizationFilter: React.FC<OrganizationFilterProps> = ({
  selectedOrganization,
  setSelectedOrganization,
  organizations
}) => {
  const getOrganizationIcon = (org?: StakeholderOrganization) => {
    switch (org) {
      case 'Geological Survey Department':
        return <Map size={16} />;
      case 'Mining Company':
        return <Building size={16} />;
      case 'Remote Sensing Agency':
        return <Map size={16} />;
      case 'Environmental Regulator':
        return <BadgeCheck size={16} />;
      case 'Academic Institution':
        return <BookOpen size={16} />;
      default:
        return <Map size={16} />;
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">Filter by Organization</h3>
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedOrganization === 'all' ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setSelectedOrganization('all')}
        >
          All Organizations
        </Badge>
        {organizations.map((org) => (
          <Badge
            key={org}
            variant={selectedOrganization === org ? "default" : "outline"}
            className="cursor-pointer flex items-center gap-1"
            onClick={() => setSelectedOrganization(org)}
          >
            {getOrganizationIcon(org)}
            {org.replace(' Department', '').replace(' Agency', '')}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default OrganizationFilter;
