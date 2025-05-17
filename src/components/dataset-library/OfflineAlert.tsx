
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface OfflineAlertProps {
  isOnline: boolean;
}

export const OfflineAlert: React.FC<OfflineAlertProps> = ({ isOnline }) => {
  if (isOnline) return null;
  
  return (
    <Alert className="bg-amber-50 border-amber-200">
      <AlertDescription className="text-amber-800">
        You are currently offline. Only cached datasets are available.
      </AlertDescription>
    </Alert>
  );
};
