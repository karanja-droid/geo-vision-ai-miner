
import { AuthUser } from '@/types/auth';

// Calculate days left in trial
export const calculateDaysLeftInTrial = (user: AuthUser | null): number | null => {
  if (!user?.subscription?.trialEnd) return null;
  
  const trialEnd = new Date(user.subscription.trialEnd);
  const now = new Date();
  const diffTime = trialEnd.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
};

// Check if user is in active trial
export const isTrialActive = (daysLeft: number | null): boolean => {
  return !!daysLeft && daysLeft > 0;
};

// Check if user is premium
export const isPremiumUser = (user: AuthUser | null): boolean => {
  return user?.subscription?.tier === 'premium';
};
