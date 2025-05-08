
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, Database } from "lucide-react";
import UserMenu from './UserMenu';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import MainNavigation from './MainNavigation';
import ConnectionStatusIndicator from './data-integration/ConnectionStatusIndicator';
import { useConnectivity } from '@/contexts/ConnectivityContext';
import { SyncStatus } from './connectivity/SyncStatus';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { isOnline } = useConnectivity();
  const isMobile = useIsMobile();

  return (
    <header className="border-b bg-card sticky top-0 z-header shadow-sm">
      <div className="container flex items-center justify-between h-16 px-2 sm:px-4 mx-auto">
        <div className="flex items-center gap-2">
          <MainNavigation />
          
          <Link to="/" className="flex items-center gap-1 sm:gap-2">
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-geo-blue text-white">
              <Database size={isMobile ? 16 : 18} />
            </div>
            <h1 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-geo-blue truncate`}>
              {isMobile ? 'GeoVision' : 'GeoVision AI Miner'}
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          {!isMobile && (
            <>
              <SyncStatus />
              <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>
              <ConnectionStatusIndicator />
            </>
          )}
          
          {isAuthenticated && !isMobile && (
            <>
              <div className="relative mr-4 w-64 hidden sm:block">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-muted-foreground" />
                </div>
                <input
                  type="search"
                  placeholder="Search data..."
                  className="w-full py-2 pl-10 pr-4 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center gap-2 mr-1 sm:mr-4">
                {isMobile ? (
                  <Button size="icon" className="bg-geo-blue hover:bg-blue-800 w-8 h-8" disabled={!isOnline}>
                    <Search className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button className="bg-geo-blue hover:bg-blue-800" disabled={!isOnline}>
                    Run AI Analysis
                  </Button>
                )}
              </div>
            </>
          )}

          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
