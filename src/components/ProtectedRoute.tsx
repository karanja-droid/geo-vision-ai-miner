
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSubscription?: boolean;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireSubscription = false,
  allowedRoles = [] 
}) => {
  const { isAuthenticated, loading, isPremiumUser, isTrialActive, user } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If this route requires subscription and user doesn't have active subscription or trial
  if (requireSubscription && !isPremiumUser && !isTrialActive) {
    return <Navigate to="/upgrade" replace />;
  }
  
  // Role-based access control
  if (allowedRoles.length > 0 && user?.role && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 max-w-md text-center">
          <h2 className="text-lg font-bold mb-2">Access Denied</h2>
          <p>
            You don't have the required permissions to access this page. 
            This area requires one of the following roles: {allowedRoles.join(', ')}.
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
  
  return <>{children}</>;
};

export default ProtectedRoute;
