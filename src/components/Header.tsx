
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, Database, Settings, Brain } from "lucide-react";
import UserMenu from './UserMenu';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="border-b bg-card">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-geo-blue text-white">
              <Database size={18} />
            </div>
            <h1 className="text-xl font-bold text-geo-blue">GeoVision AI Miner</h1>
          </Link>
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

              <nav className="hidden md:flex items-center space-x-2 mr-4">
                <Button variant="ghost" className="text-muted-foreground" asChild>
                  <Link to="/data-integration">Datasets</Link>
                </Button>
                <Button variant="ghost" className="text-muted-foreground">
                  Models
                </Button>
                <Button variant="ghost" className="text-muted-foreground">
                  Analysis
                </Button>
              </nav>

              <div className="flex items-center gap-2 mr-4">
                <Button variant="outline" size="icon">
                  <Settings size={18} />
                </Button>
                <Button className="bg-geo-blue hover:bg-blue-800">
                  <Brain size={16} className="mr-2" />
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
