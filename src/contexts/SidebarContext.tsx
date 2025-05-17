
import React, { createContext, useContext, useState } from 'react';

interface SidebarContextType {
  isExpanded: boolean;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  expandSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const toggleSidebar = () => setIsExpanded(prev => !prev);
  const collapseSidebar = () => setIsExpanded(false);
  const expandSidebar = () => setIsExpanded(true);
  
  return (
    <SidebarContext.Provider value={{ 
      isExpanded, 
      toggleSidebar, 
      collapseSidebar, 
      expandSidebar 
    }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  
  return context;
};
