
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, Database } from "lucide-react";
import UserMenu from './UserMenu';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import MainNavigation from './MainNavigation';

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-geo-blue text-white">
              <Database size={18} />
            </div>
            <h1 className="text-xl font-bold text-geo-blue">GeoVision AI Miner</h1>
          </Link>
          
          <MainNavigation />
        </div>

        <div className="flex items-center">
          {isAuthenticated && (
            <>
              <div className="relative mr-4 w-64">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-muted-foreground" />
                </div>
                <input
                  type="search"
                  placeholder="Search data..."
                  className="w-full py-2 pl-10 pr-4 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center gap-2 mr-4">
                <Button className="bg-geo-blue hover:bg-blue-800">
                  Run AI Analysis
                </Button>
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
