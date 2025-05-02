
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, AuthUser } from '@/types/auth';
import { useAuthActions } from '@/hooks/useAuthActions';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { calculateDaysLeftInTrial, checkIsTrialActive, handleUserSession } from '@/utils/authUtils';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { signIn: authSignIn, signUp: authSignUp, signOut: authSignOut, loading: authLoading } = useAuthActions();

  // Check for existing session on initial load
  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        
        // Check if Supabase is properly configured
        if (!isSupabaseConfigured()) {
          console.warn('Supabase is not properly configured. Using demo mode.');
          setLoading(false);
          return;
        }
        
        // Get session from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const userData = await handleUserSession(session);
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error("Auth session error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const userData = await handleUserSession(session);
          if (userData) {
            setUser(userData);
          }
        } else {
          setUser(null);
        }
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Calculate days left in trial
  const daysLeftInTrial = calculateDaysLeftInTrial(user?.subscription.trialEnd);

  // Check if user is in active trial
  const isTrialActive = checkIsTrialActive(user?.subscription.trialEnd, daysLeftInTrial);
  
  // Check if user has premium subscription
  const isPremiumUser = user?.subscription.tier === 'premium' || user?.subscription.tier === 'basic';

  const signIn = async (email: string, password: string): Promise<void> => {
    const userData = await authSignIn(email, password);
    if (userData) {
      setUser(userData);
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<void> => {
    const userData = await authSignUp(email, password, name);
    if (userData) {
      setUser(userData);
    }
  };

  const signOut = async (): Promise<void> => {
    await authSignOut();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading: loading || authLoading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
    isTrialActive,
    isPremiumUser,
    daysLeftInTrial
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Re-export types for convenience
export type { AuthUser, SubscriptionTier } from '@/types/auth';
