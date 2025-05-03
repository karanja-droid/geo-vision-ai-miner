
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Image, ArrowLeft, CheckCircle2, Database, Wifi, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';

interface SatelliteImageryDetailProps {
  onBack: () => void;
}

const SatelliteImageryDetail: React.FC<SatelliteImageryDetailProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsRefreshing(false);
            toast({
              title: "Connection refreshed",
              description: "Satellite imagery data has been successfully updated.",
            });
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold">Satellite Imagery</h2>
        </div>
        <Badge variant="default">Connected</Badge>
      </div>

      <Alert variant="default" className="bg-green-50 border-green-200">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <AlertTitle className="text-green-800">Connected to Remote Sensing Agency</AlertTitle>
        <AlertDescription className="text-green-700">
          Satellite imagery data is currently active and synchronized with the latest feeds.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Image className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Connection Details</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Badge variant="default" className="bg-green-600">Active</Badge>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">API Endpoint:</span>
              <span className="text-sm font-medium">api.remotesensing.org/v2</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Last Synced:</span>
              <span className="text-sm font-medium">Today at 09:45 AM</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Data Volume:</span>
              <span className="text-sm font-medium">1.73 TB</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Connection Type:</span>
              <span className="text-sm font-medium">Secure REST API</span>
            </div>
          </div>
          
          <div className="pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full" 
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Connection
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="border rounded-lg p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Available Datasets</h3>
          </div>

          {isRefreshing ? (
            <div className="space-y-4 py-4">
              <div className="text-center text-sm text-muted-foreground">Refreshing satellite imagery data...</div>
              <Progress value={progress} className="h-2" />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                <div>
                  <p className="font-medium">Landsat 8/9</p>
                  <p className="text-xs text-muted-foreground">Multispectral imagery (30m resolution)</p>
                </div>
                <Badge>Active</Badge>
              </div>
              
              <div className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                <div>
                  <p className="font-medium">Sentinel-2</p>
                  <p className="text-xs text-muted-foreground">13-band multispectral (10m resolution)</p>
                </div>
                <Badge>Active</Badge>
              </div>
              
              <div className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                <div>
                  <p className="font-medium">WorldView-3</p>
                  <p className="text-xs text-muted-foreground">High-resolution imagery (0.3m resolution)</p>
                </div>
                <Badge>Active</Badge>
              </div>
            </div>
          )}
          
          <div className="pt-2">
            <Button 
              variant="default" 
              size="sm" 
              className="w-full"
              asChild
            >
              <Link to="/satellite-vision">
                <Image className="h-4 w-4 mr-2" />
                Analyze with SatelliteVision
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Wifi className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Connection Metrics</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted/50 p-3 rounded-md">
            <p className="text-sm text-muted-foreground">API Requests (24h)</p>
            <p className="text-2xl font-semibold">1,256</p>
            <p className="text-xs text-green-600">+12% from yesterday</p>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-md">
            <p className="text-sm text-muted-foreground">Data Transfer</p>
            <p className="text-2xl font-semibold">87.4 GB</p>
            <p className="text-xs text-green-600">98.7% success rate</p>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-md">
            <p className="text-sm text-muted-foreground">Response Time</p>
            <p className="text-2xl font-semibold">185 ms</p>
            <p className="text-xs text-amber-600">+23ms from average</p>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-md">
            <p className="text-sm text-muted-foreground">Uptime</p>
            <p className="text-2xl font-semibold">99.98%</p>
            <p className="text-xs text-green-600">Last outage: 15 days ago</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" onClick={onBack}>Back to Data Sources</Button>
        <Button asChild>
          <Link to="/satellite-vision">
            Open SatelliteVision Demo
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SatelliteImageryDetail;
