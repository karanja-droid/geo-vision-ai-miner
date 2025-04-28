
import React from 'react';
import { UserRole } from '@/types';
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Database, 
  FileText, 
  BarChart, 
  HardHat, 
  Map, 
  BadgeCheck, 
  BookOpen, 
  Building 
} from 'lucide-react';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onRoleChange }) => {
  const roles: { 
    id: UserRole; 
    label: string; 
    icon: React.ReactNode; 
    description: string;
    category: 'internal' | 'stakeholder';
  }[] = [
    // Internal roles
    { 
      id: 'geologist', 
      label: 'Geologist', 
      icon: <Database size={16} />,
      description: 'Full access to analysis tools and data management',
      category: 'internal'
    },
    { 
      id: 'drill-team', 
      label: 'Drill Team', 
      icon: <HardHat size={16} />, 
      description: 'Focus on field operations and sample collection',
      category: 'internal'
    },
    { 
      id: 'government', 
      label: 'Government', 
      icon: <FileText size={16} />, 
      description: 'Regulatory oversight and compliance monitoring',
      category: 'internal'
    },
    { 
      id: 'investor', 
      label: 'Investor', 
      icon: <BarChart size={16} />, 
      description: 'Project progress and financial performance',
      category: 'internal'
    },
    { 
      id: 'admin', 
      label: 'Admin', 
      icon: <Users size={16} />, 
      description: 'Complete system access and user management',
      category: 'internal'
    },
    // Stakeholder roles
    { 
      id: 'geological-survey', 
      label: 'Geological Survey', 
      icon: <Map size={16} />, 
      description: 'Historical maps and mineral occurrence data',
      category: 'stakeholder'
    },
    { 
      id: 'mining-company', 
      label: 'Mining Company', 
      icon: <Building size={16} />, 
      description: 'Exploration licenses and drilling results',
      category: 'stakeholder'
    },
    { 
      id: 'remote-sensing', 
      label: 'Remote Sensing', 
      icon: <Map size={16} />, 
      description: 'Satellite imagery and LIDAR data',
      category: 'stakeholder'
    },
    { 
      id: 'environmental', 
      label: 'Environmental', 
      icon: <BadgeCheck size={16} />, 
      description: 'Compliance with sustainability standards',
      category: 'stakeholder'
    },
    { 
      id: 'academic', 
      label: 'Academic', 
      icon: <BookOpen size={16} />, 
      description: 'Research on regional geology and modeling',
      category: 'stakeholder'
    }
  ];

  // Filter roles by category
  const internalRoles = roles.filter(role => role.category === 'internal');
  const stakeholderRoles = roles.filter(role => role.category === 'stakeholder');

  return (
    <div className="bg-card shadow-sm rounded-lg p-4 mb-6">
      <h2 className="text-sm font-medium mb-3">Select Role View</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-xs text-muted-foreground mb-2">Internal Roles</h3>
          <div className="flex flex-wrap gap-2">
            {internalRoles.map((role) => (
              <Badge
                key={role.id}
                variant={selectedRole === role.id ? "default" : "outline"}
                className={`cursor-pointer flex items-center gap-1 px-3 py-1.5 ${
                  selectedRole === role.id ? 'bg-primary text-primary-foreground' : ''
                }`}
                onClick={() => onRoleChange(role.id)}
              >
                {role.icon}
                {role.label}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xs text-muted-foreground mb-2">Stakeholder Roles</h3>
          <div className="flex flex-wrap gap-2">
            {stakeholderRoles.map((role) => (
              <Badge
                key={role.id}
                variant={selectedRole === role.id ? "default" : "outline"}
                className={`cursor-pointer flex items-center gap-1 px-3 py-1.5 ${
                  selectedRole === role.id ? 'bg-primary text-primary-foreground' : ''
                }`}
                onClick={() => onRoleChange(role.id)}
              >
                {role.icon}
                {role.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-3">
        {roles.find(role => role.id === selectedRole)?.description}
      </p>
    </div>
  );
};

export default RoleSelector;
