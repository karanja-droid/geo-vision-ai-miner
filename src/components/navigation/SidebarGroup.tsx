
import React from 'react';
import SidebarGroupTitle from './SidebarGroupTitle';

interface SidebarGroupProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const SidebarGroup: React.FC<SidebarGroupProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`mb-6 ${className}`}>
      <SidebarGroupTitle title={title} />
      <div className="space-y-1 mt-1 px-3">
        {children}
      </div>
    </div>
  );
};

export default SidebarGroup;
