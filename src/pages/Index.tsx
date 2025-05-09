
import React from 'react';
import Dashboard from '@/components/Dashboard';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Index: React.FC = () => {
  const { user, isTrialActive, daysLeftInTrial } = useAuth();
  const { t } = useTranslation();

  return (
    <div>
      {isTrialActive && (
        <div className="bg-blue-50 p-4 mb-4 rounded-lg mx-4 mt-4">
          <p className="text-blue-800">
            {t('trial.welcome')} <strong>{daysLeftInTrial}</strong> {daysLeftInTrial === 1 ? t('trial.daysLeft') : t('trial.daysLeftPlural')} {t('trial.leftToExplore')}
          </p>
        </div>
      )}
      
      {user && (
        <div className="bg-gray-50 p-4 mb-4 rounded-lg mx-4 flex items-center">
          <Shield className="text-primary h-5 w-5 mr-2" />
          <div>
            <span className="font-medium">{t('security.securityLevel')} </span>
            <Badge variant="outline" className="ml-1">
              {user.role || 'User'}
            </Badge>
            <p className="text-sm text-muted-foreground mt-1">
              {t('security.roleDescription')}
            </p>
          </div>
        </div>
      )}
      
      <Dashboard />
    </div>
  );
};

export default Index;
