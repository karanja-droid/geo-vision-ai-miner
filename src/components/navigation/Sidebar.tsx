
import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import WorkflowSidebar from './WorkflowSidebar';
import SidebarToggle from './SidebarToggle';
import CollapsedSidebar from './CollapsedSidebar';

interface SidebarProps {
  className?: string;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  className, 
  isCollapsed,
  toggleCollapse
}) => {
  const { t } = useTranslation();
  
  return (
    <aside 
      className={cn(
        "border-r h-screen transition-all duration-300 ease-in-out overflow-y-auto",
        isCollapsed ? "w-[60px]" : "w-[240px]",
        className
      )}
    >
      <SidebarToggle isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />

      {isCollapsed ? (
        <CollapsedSidebar />
      ) : (
        <WorkflowSidebar />
      )}
    </aside>
  );
};
