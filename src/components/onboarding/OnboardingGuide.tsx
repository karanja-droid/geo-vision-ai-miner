
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
import { Progress } from '@/components/ui/progress';
import { Steps, StepItem } from '@/components/ui/steps';

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
      description: t('onboarding.welcome.description') + ' This beta version includes advanced features for geological analysis and monitoring.',
    },
    {
      title: t('onboarding.exploration.title'),
      description: t('onboarding.exploration.description') + ' The beta includes our new satellite imagery analysis and anomaly detection.',
    },
    {
      title: t('onboarding.resources.title'),
      description: t('onboarding.resources.description') + ' During the beta, our documentation is being continuously updated based on user feedback.',
    },
    {
      title: t('onboarding.data.title'),
      description: t('onboarding.data.description') + ' Beta testers can now upload GIS shapefiles and connect to real-time monitoring tools.',
    },
    {
      title: t('onboarding.analysis.title'),
      description: t('onboarding.analysis.description') + ' Our new AI analysis engine provides enhanced insights with real-time monitoring and alerts.',
    },
    {
      title: "Monitoring & Alerts",
      description: "The beta includes a new monitoring system that can alert you to errors, performance issues, and API health. Configure your monitoring settings in the Slack Integration panel.",
    },
    {
      title: "Beta Feedback",
      description: "Your feedback is crucial during this beta phase. Use the feedback button in the bottom right corner to report issues or suggest improvements.",
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

  const progress = Math.round((currentStep / (onboardingSteps.length - 1)) * 100);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">{onboardingSteps[currentStep].title}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription className="flex items-center space-x-2">
            <span>{t('onboarding.stepCount', { current: currentStep + 1, total: onboardingSteps.length })}</span>
            <Progress value={progress} className="h-2 flex-1" />
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
          <p className="text-muted-foreground">{onboardingSteps[currentStep].description}</p>
          
          {currentStep === 0 && (
            <div className="mt-4 bg-blue-50 p-3 rounded-md text-blue-800 text-sm">
              <p className="font-semibold">Beta Version Notice:</p>
              <p>You're accessing a beta version of GeoVision AI Miner. Some features may be incomplete or subject to change.</p>
            </div>
          )}
          
          {currentStep === onboardingSteps.length - 1 && (
            <div className="mt-4">
              <Steps className="mt-6">
                <StepItem step={1} title="Upload Your Data">
                  <p>Start by uploading your geological data files through the Data Management page.</p>
                </StepItem>
                <StepItem step={2} title="Configure Analysis">
                  <p>Set up your analysis parameters and select the AI models you want to use.</p>
                </StepItem>
                <StepItem step={3} title="Set Up Monitoring">
                  <p>Configure alerts for critical errors or performance issues in the Slack Integration panel.</p>
                </StepItem>
              </Steps>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
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
