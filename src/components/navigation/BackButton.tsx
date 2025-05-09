
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
  // Only show back button if not on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="mr-1"
      onClick={() => navigate(-1)}
      aria-label={t('navigation.goBack')}
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;
