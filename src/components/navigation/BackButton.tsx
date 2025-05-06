
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleGoBack}
      className="mr-2"
      title="Go back"
    >
      <ChevronLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;
