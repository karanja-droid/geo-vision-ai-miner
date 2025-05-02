
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { AuthUser } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

// Extract user data from session and get profile data from database
export const handleUserSession = async (session: Session): Promise<AuthUser | null> => {
  try {
    const authUser = session.user;
    
    // Get additional user data from profiles table
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('name, role, organization, subscription_tier, trial_end_date')
      .eq('id', authUser.id)
      .single();

    if (error) {
      throw error;
    }

    // Create user object with combined auth and profile data
    const userData: AuthUser = {
      id: authUser.id,
      email: authUser.email || '',
      name: profile?.name || authUser.email?.split('@')[0] || 'User',
      role: profile?.role || 'user',
      organization: profile?.organization,
      subscription: {
        tier: profile?.subscription_tier || 'free',
        trialEnd: profile?.trial_end_date ? new Date(profile.trial_end_date) : null,
        isActive: true
      }
    };

    return userData;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

// Calculate days left in trial
export const calculateDaysLeftInTrial = (trialEndDate: Date | null): number | null => {
  return trialEndDate 
    ? Math.max(0, Math.ceil((new Date(trialEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;
};

// Check if user is in active trial
export const checkIsTrialActive = (trialEndDate: Date | null, daysLeft: number | null): boolean => {
  return !!trialEndDate && daysLeft !== null && daysLeft > 0;
};

// Create demo user for testing without Supabase
export const createDemoUser = (email: string, name: string = ''): AuthUser => {
  return {
    id: 'demo-user-id',
    email: email,
    name: name || email.split('@')[0] || 'Demo User',
    role: 'geologist',
    organization: 'Demo Organization',
    subscription: {
      tier: 'free',
      trialEnd: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      isActive: true
    }
  };
};
