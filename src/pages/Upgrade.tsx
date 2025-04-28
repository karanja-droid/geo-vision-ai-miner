
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Shield, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Upgrade: React.FC = () => {
  const { user, daysLeftInTrial, isTrialActive } = useAuth();
  const { toast } = useToast();

  const handleUpgrade = (plan: 'basic' | 'premium') => {
    // In a real app, this would initiate the payment flow with Stripe
    toast({
      title: "Subscription flow initiated",
      description: `You selected the ${plan} plan. In a real app, this would redirect to Stripe.`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Upgrade Your Plan</h1>
          <p className="text-muted-foreground">
            {isTrialActive 
              ? `Your trial expires in ${daysLeftInTrial} day${daysLeftInTrial === 1 ? '' : 's'}.` 
              : 'Your trial has expired. Choose a plan to continue using premium features.'}
          </p>
        </div>

        {isTrialActive && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Trial Active</p>
                <p className="text-sm text-yellow-700">
                  You currently have full access to all features during your trial period. 
                  After your trial ends, you'll need to choose a subscription plan.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Basic Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Basic Plan
                <span className="text-2xl font-bold">$9.99<span className="text-sm text-muted-foreground font-normal">/mo</span></span>
              </CardTitle>
              <CardDescription>For individual geologists and small teams</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Basic geological data analysis</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Up to 5 geological maps</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Data upload up to 1GB</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Basic AI analysis tools</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Email support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleUpgrade('basic')}>
                Choose Basic Plan
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-primary">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-md rounded-tr-md">
              RECOMMENDED
            </div>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Premium Plan
                <span className="text-2xl font-bold">$29.99<span className="text-sm text-muted-foreground font-normal">/mo</span></span>
              </CardTitle>
              <CardDescription>For professional teams and organizations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Advanced geological data analysis</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Unlimited geological maps</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Data upload up to 50GB</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Advanced AI analysis with custom models</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Priority support with dedicated manager</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Team collaboration tools</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>API access</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="default" onClick={() => handleUpgrade('premium')}>
                Choose Premium Plan
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-10 text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            <span className="text-sm font-medium">Secure payment processing with Stripe</span>
          </div>
          <p className="text-sm text-muted-foreground">
            All plans include a 30-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
