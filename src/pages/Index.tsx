
import React from 'react';
import Dashboard from '@/components/Dashboard';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

const Index: React.FC = () => {
  const { user, isTrialActive, daysLeftInTrial } = useAuth();

  return (
    <div>
      {isTrialActive && (
        <div className="bg-blue-50 p-4 mb-4 rounded-lg mx-4 mt-4">
          <p className="text-blue-800">
            Welcome to your free trial! You have <strong>{daysLeftInTrial}</strong> day{daysLeftInTrial === 1 ? '' : 's'} left to explore all premium features.
          </p>
        </div>
      )}
      
      {user && (
        <div className="bg-gray-50 p-4 mb-4 rounded-lg mx-4 flex items-center">
          <Shield className="text-primary h-5 w-5 mr-2" />
          <div>
            <span className="font-medium">Security Level: </span>
            <Badge variant="outline" className="ml-1">
              {user.role || 'User'}
            </Badge>
            <p className="text-sm text-muted-foreground mt-1">
              Your role determines what data and features you can access in this application.
            </p>
          </div>
        </div>
      )}
      
      <Dashboard />
    </div>
  );
};

export default Index;
