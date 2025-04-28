
import React from 'react';
import { UserRole } from '@/types';
import { Badge } from "@/components/ui/badge";
import { Users, Database, FileText, BarChart, HardHat } from 'lucide-react';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onRoleChange }) => {
  const roles: { id: UserRole; label: string; icon: React.ReactNode; description: string }[] = [
    { 
      id: 'geologist', 
      label: 'Geologist', 
      icon: <Database size={16} />,
      description: 'Full access to analysis tools and data management'
    },
    { 
      id: 'drill-team', 
      label: 'Drill Team', 
      icon: <HardHat size={16} />, 
      description: 'Focus on field operations and sample collection'
    },
    { 
      id: 'government', 
      label: 'Government', 
      icon: <FileText size={16} />, 
      description: 'Regulatory oversight and compliance monitoring'
    },
    { 
      id: 'investor', 
      label: 'Investor', 
      icon: <BarChart size={16} />, 
      description: 'Project progress and financial performance'
    },
    { 
      id: 'admin', 
      label: 'Admin', 
      icon: <Users size={16} />, 
      description: 'Complete system access and user management'
    }
  ];

  return (
    <div className="bg-card shadow-sm rounded-lg p-4 mb-6">
      <h2 className="text-sm font-medium mb-3">Select Role View</h2>
      <div className="flex flex-wrap gap-2">
        {roles.map((role) => (
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
      <p className="text-xs text-muted-foreground mt-2">
        {roles.find(role => role.id === selectedRole)?.description}
      </p>
    </div>
  );
};

export default RoleSelector;
