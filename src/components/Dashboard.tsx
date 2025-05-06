
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Map from "@/components/Map";
import UploadPanel from "@/components/UploadPanel";
import AnalysisPanel from "@/components/AnalysisPanel";
import GeoMinerInsights from "@/components/GeoMinerInsights";
import { Link } from "react-router-dom";
import { Map as MapIcon, Combine, Database, Globe } from "lucide-react";

const Dashboard: React.FC = () => {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    subscription: "Premium",
    lastLogin: "2024-04-29"
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
        <p className="text-muted-foreground">
          Explore geological data and unlock valuable insights
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Map className="md:col-span-2" />
        <div className="md:col-span-1 flex flex-col gap-6">
          <UploadPanel />
          <AnalysisPanel />
        </div>
      </div>

      {/* Added the GeoMinerInsights component */}
      <div className="mt-6">
        <GeoMinerInsights />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Explore Our Tools</CardTitle>
            <CardDescription>Powerful features to enhance your geological analysis</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6">
            <Button variant="outline" asChild className="h-auto py-4 flex flex-col items-center justify-center">
              <Link to="/interactive-map">
                <MapIcon className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">Interactive Geological Map</span>
                <span className="text-xs text-muted-foreground mt-1">Explore global geological data</span>
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="h-auto py-4 flex flex-col items-center justify-center">
              <Link to="/data-integration">
                <Combine className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">Data Integration Tools</span>
                <span className="text-xs text-muted-foreground mt-1">Connect diverse data sources</span>
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="h-auto py-4 flex flex-col items-center justify-center">
              <Link to="/dataset-management">
                <Database className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">Dataset Management</span>
                <span className="text-xs text-muted-foreground mt-1">Organize your geological datasets</span>
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="h-auto py-4 flex flex-col items-center justify-center">
              <Link to="/global-data-integration">
                <Globe className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">Global Data Integration</span>
                <span className="text-xs text-muted-foreground mt-1">Worldwide geological insights</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Manage your account and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Subscription Status</p>
              <Badge variant="secondary">{user.subscription}</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Email Address</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Last Login</p>
              <p className="text-sm text-muted-foreground">
                {new Date(user.lastLogin).toLocaleDateString()}
              </p>
            </div>
            <Button variant="outline">Manage Account</Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <p className="text-center text-muted-foreground">
          © 2024 Geological Data Platform. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
