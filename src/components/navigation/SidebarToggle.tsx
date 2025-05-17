
import React from 'react';

interface SidebarToggleProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ 
  isCollapsed, 
  toggleCollapse 
}) => {
  return (
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
  );
};

export default SidebarToggle;
