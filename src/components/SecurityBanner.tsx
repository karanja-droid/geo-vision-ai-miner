
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ShieldAlert } from 'lucide-react';

const SecurityBanner: React.FC = () => {
  return (
    <Alert variant="destructive" className="mb-4">
      <ShieldAlert className="h-4 w-4" />
      <AlertTitle>Development Environment</AlertTitle>
      <AlertDescription>
        This is a demonstration application with mock authentication and data. 
        In a production environment, this app would use secure authentication,
        encrypted connections, and proper database security measures.
      </AlertDescription>
    </Alert>
  );
};

export default SecurityBanner;
