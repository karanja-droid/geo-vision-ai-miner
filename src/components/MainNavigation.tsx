
import React from 'react';
import BackButton from '@/components/navigation/BackButton';
import MobileNavigation from '@/components/navigation/MobileNavigation';
import DesktopNavigation from '@/components/navigation/DesktopNavigation';
import { useIsMobile } from '@/hooks/use-mobile';

const MainNavigation: React.FC = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex items-center">
      <BackButton />
      
      {isMobile ? (
        <MobileNavigation isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : (
        <div className="flex items-center space-x-4">
          <DesktopNavigation />
        </div>
      )}
    </div>
  );
};

export default MainNavigation;
