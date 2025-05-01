
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { UserRound, Settings, LogOut, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const UserMenu: React.FC = () => {
  const { user, signOut, isTrialActive } = useAuth();
  
  if (!user) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link to="/login">Log in</Link>
        </Button>
        <Button asChild>
          <Link to="/signup">Sign up</Link>
        </Button>
      </div>
    );
  }
  
  const getPlanBadge = () => {
    if (user.subscription.tier === 'premium') {
      return <Badge className="ml-2 bg-primary">Premium</Badge>;
    } else if (user.subscription.tier === 'basic') {
      return <Badge className="ml-2 bg-blue-500">Basic</Badge>;
    } else if (isTrialActive) {
      return <Badge className="ml-2 bg-amber-500">Trial</Badge>;
    }
    return <Badge className="ml-2 bg-gray-500">Free</Badge>;
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full w-10 h-10 p-0">
          <UserRound className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            <div className="flex items-center mt-1.5">
              {getPlanBadge()}
              {user.role === 'admin' && (
                <Badge variant="outline" className="ml-2 border-primary text-primary">Admin</Badge>
              )}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/account">
              <UserRound className="mr-2 h-4 w-4" />
              <span>My Account</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/upgrade">
              <Settings className="mr-2 h-4 w-4" />
              <span>Subscription</span>
            </Link>
          </DropdownMenuItem>
          {user.role === 'admin' && (
            <DropdownMenuItem asChild>
              <Link to="/admin">
                <Shield className="mr-2 h-4 w-4" />
                <span>Admin Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
