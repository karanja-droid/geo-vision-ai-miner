
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { WifiOff, Wifi } from "lucide-react";

const ConnectionStatusIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    // Set up event listeners for online/offline status changes
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) {
    return (
      <div className="flex items-center space-x-2 py-2">
        <Wifi className="h-4 w-4 text-green-600" />
        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
          Online
        </Badge>
      </div>
    );
  }

  return (
    <Alert variant="destructive" className="mb-4">
      <WifiOff className="h-5 w-5" />
      <AlertTitle>You are currently offline</AlertTitle>
      <AlertDescription>
        Some features may be limited until your connection is restored.
      </AlertDescription>
    </Alert>
  );
};

export default ConnectionStatusIndicator;
