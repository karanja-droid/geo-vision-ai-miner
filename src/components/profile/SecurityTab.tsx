
import React from 'react';
import PasswordChangeForm from './PasswordChangeForm';
import AccountActions from './AccountActions';
import AdminRequestButton from './AdminRequestButton';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

const SecurityTab: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <>
      <PasswordChangeForm />
      
      {user?.role === 'admin' && (
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-700">
            You have administrator privileges. You can access the admin panel via the <a href="/admin" className="underline font-medium">Admin Dashboard</a> or through the user menu.
          </AlertDescription>
        </Alert>
      )}
      
      <AccountActions />
      
      {user && user.role !== 'admin' && (
        <AdminRequestButton />
      )}
    </>
  );
};

export default SecurityTab;
