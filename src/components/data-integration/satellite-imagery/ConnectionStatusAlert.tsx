
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

const ConnectionStatusAlert: React.FC = () => {
  return (
    <Alert variant="default" className="bg-green-50 border-green-200">
      <CheckCircle2 className="h-5 w-5 text-green-600" />
      <AlertTitle className="text-green-800">Connected to Remote Sensing Agency</AlertTitle>
      <AlertDescription className="text-green-700">
        Satellite imagery data is currently active and synchronized with the latest feeds.
      </AlertDescription>
    </Alert>
  );
};

export default ConnectionStatusAlert;
