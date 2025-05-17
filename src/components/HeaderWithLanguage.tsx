
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import UserMenu from './UserMenu';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { Search, Bell } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const HeaderWithLanguage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-background border-b z-20 sticky top-0 left-0 right-0 h-16">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left side - Search */}
        {user && (
          <div className="relative w-64 hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="search"
              placeholder={t('common.searchData')}
              className="w-full py-2 pl-10 pr-4 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        )}

        {/* Center - Mobile view only */}
        {isMobile && (
          <Link to="/" className="font-bold text-xl text-primary flex items-center mx-auto">
            GeoVision AI
          </Link>
        )}

        {/* Right Side - Actions */}
        <div className="flex items-center space-x-2 ml-auto">
          {/* Notifications */}
          {user && (
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
          )}
          
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {/* User Menu / Auth */}
          {user ? (
            <UserMenu user={user} onLogout={handleLogout} />
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderWithLanguage;
