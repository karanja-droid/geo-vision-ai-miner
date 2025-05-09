
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from 'lucide-react';
import { SubscriptionTier } from '@/contexts/AuthContext';

const SubscriptionTab: React.FC = () => {
  const { user, isPremiumUser } = useAuth();
  
  const getSubscriptionBadgeColor = (tier: SubscriptionTier | undefined) => {
    switch(tier) {
      case 'premium':
        return "bg-primary";
      case 'basic':
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };
  
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Subscription Details</CardTitle>
          <CardDescription>
            Manage your subscription plan and billing details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Current Plan</h3>
            <div className="flex items-center space-x-2">
              <Badge className={getSubscriptionBadgeColor(user?.subscription?.tier)}>
                {user?.subscription?.tier === 'premium' ? 'Premium' : 
                 user?.subscription?.tier === 'basic' ? 'Basic' : 'Free'}
              </Badge>
              {user?.subscription?.trialEnd && (
                <Badge variant="outline">
                  Trial ends: {formatDate(user?.subscription?.trialEnd)}
                </Badge>
              )}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Basic data analysis</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Standard visualizations</span>
              </li>
              {isPremiumUser ? (
                <>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Advanced AI analysis</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Custom data integrations</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Priority support</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center text-muted-foreground">
                    <span className="mr-2">✗</span>
                    <span>Advanced AI analysis</span>
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="mr-2">✗</span>
                    <span>Custom data integrations</span>
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="mr-2">✗</span>
                    <span>Priority support</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <a href="/upgrade">
              {user?.subscription?.tier === 'free' ? 'Upgrade Plan' : 'Manage Subscription'}
            </a>
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            View your recent transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground opacity-50" />
            <p className="ml-4 text-muted-foreground">
              No billing history available
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SubscriptionTab;
