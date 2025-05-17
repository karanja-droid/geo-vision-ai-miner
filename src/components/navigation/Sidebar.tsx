
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import WorkflowSidebar from './WorkflowSidebar';

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
      <div className="p-4">
        <button 
          onClick={toggleCollapse} 
          className="w-full flex items-center justify-center p-2 rounded-md hover:bg-accent"
        >
          <div className={`h-5 w-5 transition-transform ${isCollapsed ? "" : "rotate-180"}`}>
            {isCollapsed ? "→" : "←"}
          </div>
        </button>
      </div>

      {isCollapsed ? (
        <div className="flex flex-col items-center px-2 py-4 space-y-4">
          {/* Collapsed sidebar with just icons */}
          <Link to="/" className="p-2 rounded-md hover:bg-accent">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="7" height="9" x="3" y="3" rx="1" />
              <rect width="7" height="5" x="14" y="3" rx="1" />
              <rect width="7" height="9" x="14" y="12" rx="1" />
              <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
          </Link>
          {/* Add more collapsed icons here */}
        </div>
      ) : (
        <WorkflowSidebar />
      )}
    </aside>
  );
};
