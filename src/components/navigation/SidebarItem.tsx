
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  badge?: string | number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  to, 
  icon, 
  label, 
  isActive,
  badge
}) => {
  return (
    <Link 
      to={to}
      className={cn(
        "flex items-center py-2 px-3 rounded-md text-sm font-medium",
        "hover:bg-accent/50 transition-colors relative",
        isActive 
          ? "bg-accent text-accent-foreground" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <div className="mr-3 text-current">{icon}</div>
      <span>{label}</span>
      {badge && (
        <span className="ml-auto bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
};

export default SidebarItem;
