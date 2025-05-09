
import React from 'react';
import { InstallPWAButton } from './connectivity/InstallPWAButton';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card border-t py-4">
      <div className="container flex items-center justify-between px-4 mx-auto">
        <div>
          <p className="text-xs text-muted-foreground">
            {t('common.copyright', { year: currentYear })}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <InstallPWAButton />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
