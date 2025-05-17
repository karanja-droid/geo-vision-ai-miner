
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import { AuthUser } from '@/types/auth';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User, LogOut } from 'lucide-react';

interface UserMenuProps {
  user: AuthUser;
  onLogout: () => Promise<void>;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await onLogout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navigateToProfile = () => {
    navigate('/user-profile');
  };

  const navigateToAdmin = () => {
    navigate('/admin-dashboard');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={navigateToProfile}>
          <User className="mr-2 h-4 w-4" />
          {t('common.profile')}
        </DropdownMenuItem>
        
        {user.role === 'admin' && (
          <DropdownMenuItem onClick={navigateToAdmin}>
            <ShieldCheck className="mr-2 h-4 w-4" />
            Admin Dashboard
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t('common.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
