
import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Drawer, 
  DrawerTrigger, 
  DrawerContent,
  DrawerClose 
} from '@/components/ui/drawer';
import { MobileNavigationGroup, MobileDirectLinks } from './MobileNavigationMenu';
import { getDataItems, getAnalysisItems, getResourcesItems } from './NavigationData';

interface MobileNavigationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[100dvh] w-[85%] max-w-[300px] left-0 right-auto rounded-none">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="font-semibold text-lg">Menu</h2>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </DrawerClose>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1">
          <div className="flex flex-col gap-6">
            <MobileNavigationGroup title="Data" items={getDataItems()} />
            <MobileNavigationGroup title="Analysis" items={getAnalysisItems()} />
            <MobileNavigationGroup title="Resources" items={getResourcesItems()} />
            <MobileDirectLinks />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavigation;
