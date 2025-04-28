
import React from 'react';
import Dashboard from '@/components/Dashboard';
import { useAuth } from '@/contexts/AuthContext';

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
      <Dashboard />
    </div>
  );
};

export default Index;
