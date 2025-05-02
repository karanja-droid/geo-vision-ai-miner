
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { GlobalDataVisualization } from "@/components/GlobalDataVisualization";
import { GlobalDataSources } from "@/components/GlobalDataSources";
import { DataInsights } from "@/components/DataInsights";
import { InvestorDashboard } from "@/components/InvestorDashboard";
import { Globe, Database, ChartLine, Layers, Users, Combine } from "lucide-react";

const GlobalDataIntegration: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('visualization');

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Global Data Integration Platform</h1>
          <p className="text-muted-foreground">
            Integrate and analyze geological data from worldwide sources
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/interactive-map">View Interactive Map</Link>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="visualization">Data Visualization</TabsTrigger>
          <TabsTrigger value="sources">Global Data Sources</TabsTrigger>
          <TabsTrigger value="insights">Data Insights</TabsTrigger>
          <TabsTrigger value="investors">Investor Dashboard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visualization">
          <Alert variant="default" className="mb-6 bg-primary/10 border-primary/20">
            <Globe className="h-5 w-5" />
            <AlertTitle>Global Data Visualization</AlertTitle>
            <AlertDescription>
              Interactive visualization of integrated geological datasets from around the world
            </AlertDescription>
          </Alert>
          
          <GlobalDataVisualization />
        </TabsContent>
        
        <TabsContent value="sources">
          <Alert variant="default" className="mb-6 bg-primary/10 border-primary/20">
            <Database className="h-5 w-5" />
            <AlertTitle>Global Data Sources</AlertTitle>
            <AlertDescription>
              Connect and manage geological data sources from multiple continents
            </AlertDescription>
          </Alert>
          
          <GlobalDataSources />
        </TabsContent>
        
        <TabsContent value="insights">
          <Alert variant="default" className="mb-6 bg-primary/10 border-primary/20">
            <ChartLine className="h-5 w-5" />
            <AlertTitle>Data Insights</AlertTitle>
            <AlertDescription>
              AI-powered analytics and predictive models based on integrated global datasets
            </AlertDescription>
          </Alert>
          
          <DataInsights />
        </TabsContent>
        
        <TabsContent value="investors">
          <Alert variant="default" className="mb-6 bg-primary/10 border-primary/20">
            <Users className="h-5 w-5" />
            <AlertTitle>Investor Dashboard</AlertTitle>
            <AlertDescription>
              Key metrics and investment opportunities from global geological data analysis
            </AlertDescription>
          </Alert>
          
          <InvestorDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GlobalDataIntegration;
