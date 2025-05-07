
import React from 'react';
import { InstallPWAButton } from './connectivity/InstallPWAButton';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t py-4">
      <div className="container flex items-center justify-between px-4 mx-auto">
        <div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GeoVision AI Miner. All rights reserved.
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
