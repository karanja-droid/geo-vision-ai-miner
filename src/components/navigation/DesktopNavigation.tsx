
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { 
  ExplorationMenuItems,
  ResourceMenuItems,
  DataMenuItems,
  AnalysisMenuItems,
  SupportMenuItems,
  DirectLinks
} from '@/components/navigation/NavigationMenuItems';

const DesktopNavigation: React.FC = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Exploration Group */}
        <ExplorationMenuItems />
        
        {/* Resource Group */}
        <ResourceMenuItems />
        
        {/* Data Group */}
        <DataMenuItems />
        
        {/* Analysis Group */}
        <AnalysisMenuItems />
        
        {/* Support Group */}
        <SupportMenuItems />
        
        {/* Direct Links */}
        <DirectLinks />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavigation;
