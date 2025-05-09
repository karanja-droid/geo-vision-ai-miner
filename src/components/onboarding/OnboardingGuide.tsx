
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

interface OnboardingStep {
  title: string;
  description: string;
  image?: string;
}

const OnboardingGuide: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Check if user has seen the onboarding
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    if (!onboardingComplete) {
      setIsVisible(true);
      setHasSeenOnboarding(false);
    } else {
      setHasSeenOnboarding(true);
    }
  }, []);

  const onboardingSteps: OnboardingStep[] = [
    {
      title: t('onboarding.welcome.title'),
      description: t('onboarding.welcome.description'),
    },
    {
      title: t('onboarding.exploration.title'),
      description: t('onboarding.exploration.description'),
    },
    {
      title: t('onboarding.resources.title'),
      description: t('onboarding.resources.description'),
    },
    {
      title: t('onboarding.data.title'),
      description: t('onboarding.data.description'),
    },
    {
      title: t('onboarding.analysis.title'),
      description: t('onboarding.analysis.description'),
    },
  ];

  const completeOnboarding = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setIsVisible(false);
    setHasSeenOnboarding(true);
  };

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetOnboarding = () => {
    localStorage.removeItem('onboardingComplete');
    setIsVisible(true);
    setCurrentStep(0);
    setHasSeenOnboarding(false);
  };

  if (!isVisible) {
    return hasSeenOnboarding ? (
      <Button 
        variant="outline" 
        size="sm" 
        className="fixed bottom-4 right-4 z-50"
        onClick={resetOnboarding}
      >
        {t('onboarding.showGuide')}
      </Button>
    ) : null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{onboardingSteps[currentStep].title}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            {t('onboarding.stepCount', { current: currentStep + 1, total: onboardingSteps.length })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {onboardingSteps[currentStep].image && (
            <img 
              src={onboardingSteps[currentStep].image} 
              alt={onboardingSteps[currentStep].title}
              className="mb-4 rounded-md w-full h-auto"
            />
          )}
          <p>{onboardingSteps[currentStep].description}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            {t('onboarding.previous')}
          </Button>
          <Button onClick={nextStep}>
            {currentStep === onboardingSteps.length - 1 
              ? t('onboarding.finish') 
              : t('onboarding.next')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingGuide;
