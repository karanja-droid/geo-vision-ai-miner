
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
import { useTranslation } from 'react-i18next';

interface MobileNavigationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t('common.menu')}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="drawer-menu z-drawer">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="font-semibold text-lg">{t('common.menu')}</h2>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
              <span className="sr-only">{t('common.close')}</span>
            </Button>
          </DrawerClose>
        </div>
        
        <div className="drawer-content-container p-4">
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
