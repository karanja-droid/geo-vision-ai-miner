
import React from 'react';
import { UserRole } from '@/types';
import { Badge } from "@/components/ui/badge";
import { Users, Database, HardHat, FileText, BarChart } from 'lucide-react';

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

// Export HardHat icon for convenience
export function HardHat(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/>
      <path d="M10 18v-7.5a3.5 3.5 0 0 1 7 0V18"/>
      <path d="M4 10v1"/>
      <path d="M20 10v1"/>
      <path d="M2 9v1"/>
      <path d="M22 9v1"/>
    </svg>
  );
}
