
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import BackButton from '@/components/navigation/BackButton';
import { 
  DataMenuItems,
  AnalysisMenuItems,
  ResourcesMenuItems,
  DirectLinks
} from '@/components/navigation/NavigationMenuItems';

const MainNavigation: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      <BackButton />
      
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
    </div>
  );
};

export default MainNavigation;
