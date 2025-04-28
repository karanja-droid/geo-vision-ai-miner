
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AlertCircle, Clock } from 'lucide-react';

const SubscriptionBanner: React.FC = () => {
  const { isAuthenticated, isTrialActive, isPremiumUser, daysLeftInTrial } = useAuth();
  
  // Don't show banner for premium users or unauthenticated users
  if (isPremiumUser || !isAuthenticated) {
    return null;
  }
  
  return (
    <div className={`p-2 text-sm ${isTrialActive ? 'bg-blue-50' : 'bg-amber-50'}`}>
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-2">
        {isTrialActive ? (
          <>
            <Clock className="h-4 w-4 text-blue-500" />
            <span>
              Your free trial expires in <strong>{daysLeftInTrial}</strong> day{daysLeftInTrial === 1 ? '' : 's'}
            </span>
          </>
        ) : (
          <>
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <span>Your free trial has expired</span>
          </>
        )}
        
        <Button size="sm" variant="outline" className="ml-2" asChild>
          <Link to="/upgrade">
            {isTrialActive ? 'Upgrade Now' : 'Choose a Plan'}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionBanner;
