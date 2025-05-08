
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { 
  DataMenuItems,
  AnalysisMenuItems,
  ResourcesMenuItems,
  DirectLinks
} from '@/components/navigation/NavigationMenuItems';

const DesktopNavigation: React.FC = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Data Group */}
        <DataMenuItems />
        
        {/* Analysis Group */}
        <AnalysisMenuItems />
        
        {/* Resources Group */}
        <ResourcesMenuItems />
        
        {/* Direct Links */}
        <DirectLinks />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavigation;
