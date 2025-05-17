
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, Database, Bell } from "lucide-react";
import UserMenu from './UserMenu';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import ConnectionStatusIndicator from './data-integration/ConnectionStatusIndicator';
import { useConnectivity } from '@/contexts/ConnectivityContext';
import { SyncStatus } from './connectivity/SyncStatus';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from 'react-i18next';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { isOnline } = useConnectivity();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="border-b bg-card sticky top-0 z-header shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo/Application Name */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-geo-blue text-white">
            <Database size={isMobile ? 16 : 18} />
          </div>
          <h1 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-geo-blue truncate`}>
            {isMobile ? 'GeoVision' : 'GeoVision AI Miner'}
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          {!isMobile && (
            <>
              <SyncStatus />
              <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>
              <ConnectionStatusIndicator />
            </>
          )}
          
          {isAuthenticated && (
            <>
              {/* Global Search (Medium+ screens) */}
              {!isMobile && (
                <div className="relative mr-4 w-64 hidden sm:block">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <input
                    type="search"
                    placeholder={t('common.searchData')}
                    className="w-full py-2 pl-10 pr-4 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              )}

              {/* Run Analysis button */}
              <div className="flex items-center gap-2 mr-4">
                {isMobile ? (
                  <Button size="icon" className="bg-geo-blue hover:bg-blue-800 w-8 h-8" disabled={!isOnline}>
                    <Search className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button className="bg-geo-blue hover:bg-blue-800" disabled={!isOnline}>
                    {t('analysis.runAnalysis')}
                  </Button>
                )}
              </div>
              
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-4">
                    <h3 className="font-medium text-sm">{t('common.notifications')}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{t('common.notificationsEmpty')}</p>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Language Switcher */}
              <LanguageSwitcher />
            </>
          )}

          {/* User Menu or Login Button */}
          {user ? (
            <UserMenu user={user} onLogout={handleLogout} />
          ) : (
            <Link to="/login">
              <Button size="sm" variant="outline">
                {t('common.login')}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
