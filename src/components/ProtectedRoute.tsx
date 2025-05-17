
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/users';
import { Shield } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSubscription?: boolean;
  allowedRoles?: UserRole[];
  strictRoleCheck?: boolean; // When true, requires exact role match
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireSubscription = false,
  allowedRoles = [],
  strictRoleCheck = false
}) => {
  const { isAuthenticated, loading, isPremiumUser, isTrialActive, user } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    // Store the intended URL to redirect the user after login
    if (!isAuthenticated && !loading) {
      sessionStorage.setItem('redirectAfterLogin', location.pathname);
    }
    
    // Show authentication toast only after component has mounted
    if (!isAuthenticated && !loading) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page",
        variant: "destructive",
      });
    }
    
    // Log access attempts to admin routes
    if (allowedRoles.includes('admin') && user && user.role !== 'admin') {
      console.warn(`Unauthorized access attempt to admin route by user ${user.id}`);
      
      // In a production environment, this would log to the server/audit log
      try {
        fetch('/api/audit-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'unauthorized_access_attempt',
            route: location.pathname,
            userId: user.id
          })
        }).catch(e => console.error('Failed to log audit event', e));
      } catch (error) {
        console.error('Error logging security event', error);
      }
    }
  }, [isAuthenticated, loading, location.pathname, user, allowedRoles, toast]);
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // If this route requires subscription and user doesn't have active subscription or trial
  if (requireSubscription && !isPremiumUser && !isTrialActive) {
    return <Navigate to="/upgrade" replace />;
  }
  
  // Role-based access control with more secure checking
  if (allowedRoles.length > 0 && user?.role) {
    const hasPermission = strictRoleCheck 
      ? allowedRoles.includes(user.role as UserRole)
      : allowedRoles.includes(user.role as UserRole) || user.role === 'admin';
      
    if (!hasPermission) {
      return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 max-w-md text-center">
            <Shield className="h-8 w-8 mx-auto mb-2 text-red-600" />
            <h2 className="text-lg font-bold mb-2">Access Denied</h2>
            <p>
              You don't have the required permissions to access this page. 
              This area requires one of the following roles: {allowedRoles.join(', ')}.
            </p>
            <p className="mt-2 text-sm">
              This access attempt has been logged for security purposes.
            </p>
            <button 
              onClick={() => window.history.back()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
