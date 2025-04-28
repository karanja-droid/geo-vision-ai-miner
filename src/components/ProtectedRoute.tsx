
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSubscription?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireSubscription = false 
}) => {
  const { isAuthenticated, loading, isPremiumUser, isTrialActive } = useAuth();
  
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
  
  return <>{children}</>;
};

export default ProtectedRoute;
