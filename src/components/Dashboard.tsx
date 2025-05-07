
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Map from "@/components/Map";
import UploadPanel from "@/components/UploadPanel";
import AnalysisPanel from "@/components/AnalysisPanel";
import { Link } from "react-router-dom";
import { Map as MapIcon, Combine, Database, Globe, BarChart } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard: React.FC = () => {
  const isMobile = useIsMobile();
  
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    subscription: "Premium",
    lastLogin: "2024-04-29"
  };
  
  return (
    <div className="container mx-auto p-2 sm:p-4">
      <div className="mb-4 sm:mb-6">
        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold`}>Welcome, {user.name}!</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Explore geological data and unlock valuable insights
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
        <Map className="md:col-span-2 h-[250px] sm:h-auto" />
        <div className="md:col-span-1 flex flex-col gap-3 sm:gap-6">
          <UploadPanel />
          <AnalysisPanel />
        </div>
      </div>

      <div className="mt-3 sm:mt-6">
        <Card>
          <CardHeader className={`pb-2 ${isMobile ? 'flex-col space-y-2' : 'flex flex-row items-center justify-between'}`}>
            <div>
              <CardTitle className={isMobile ? 'text-lg' : ''}>Strategic Vision</CardTitle>
              <CardDescription>Our product roadmap and market analysis</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild className={isMobile ? 'w-full' : ''}>
              <Link to="/product-roadmap">
                View Complete Roadmap
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-2 sm:pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-lg border bg-card p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="rounded-full bg-blue-50 p-1.5 sm:p-2">
                    <Database className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-blue-600`} />
                  </div>
                  <h3 className="font-medium text-sm sm:text-base">African Geological Data Library</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Curated regional database to enhance predictive capabilities in African mineral exploration.
                </p>
              </div>
              
              <div className="rounded-lg border bg-card p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="rounded-full bg-amber-50 p-1.5 sm:p-2">
                    <BarChart className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-amber-600`} />
                  </div>
                  <h3 className="font-medium text-sm sm:text-base">Deep Engineering Integration</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  API connections to industry tools for seamless workflow between AI insights and engineering.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-3 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className={isMobile ? 'text-lg' : ''}>Explore Our Tools</CardTitle>
            <CardDescription>Powerful features to enhance your geological analysis</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2 sm:gap-4 pb-4 sm:pb-6">
            <Button variant="outline" asChild className="h-auto py-2 sm:py-4 flex flex-col items-center justify-center">
              <Link to="/interactive-map">
                <MapIcon className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} mb-1 sm:mb-2`} />
                <span className="text-xs sm:text-sm font-medium">Interactive Map</span>
                <span className="text-xs text-muted-foreground mt-0.5 sm:mt-1 hidden sm:block">Explore geological data</span>
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="h-auto py-2 sm:py-4 flex flex-col items-center justify-center">
              <Link to="/data-integration">
                <Combine className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} mb-1 sm:mb-2`} />
                <span className="text-xs sm:text-sm font-medium">Data Integration</span>
                <span className="text-xs text-muted-foreground mt-0.5 sm:mt-1 hidden sm:block">Connect data sources</span>
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="h-auto py-2 sm:py-4 flex flex-col items-center justify-center">
              <Link to="/dataset-management">
                <Database className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} mb-1 sm:mb-2`} />
                <span className="text-xs sm:text-sm font-medium">Dataset Management</span>
                <span className="text-xs text-muted-foreground mt-0.5 sm:mt-1 hidden sm:block">Organize datasets</span>
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="h-auto py-2 sm:py-4 flex flex-col items-center justify-center">
              <Link to="/global-data-integration">
                <Globe className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} mb-1 sm:mb-2`} />
                <span className="text-xs sm:text-sm font-medium">Global Data</span>
                <span className="text-xs text-muted-foreground mt-0.5 sm:mt-1 hidden sm:block">Worldwide insights</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className={isMobile ? 'text-lg' : ''}>User Profile</CardTitle>
            <CardDescription>Manage your account and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="space-y-1 sm:space-y-2">
              <p className="text-xs sm:text-sm font-medium">Subscription Status</p>
              <Badge variant="secondary">{user.subscription}</Badge>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <p className="text-xs sm:text-sm font-medium">Email Address</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <p className="text-xs sm:text-sm font-medium">Last Login</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {new Date(user.lastLogin).toLocaleDateString()}
              </p>
            </div>
            <Button variant="outline" className={isMobile ? 'w-full' : ''}>Manage Account</Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-4 sm:mt-6">
        <p className="text-center text-xs sm:text-sm text-muted-foreground">
          © 2024 Geological Data Platform. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
