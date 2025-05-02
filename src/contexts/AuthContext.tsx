import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

export type SubscriptionTier = 'free' | 'basic' | 'premium';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  subscription: {
    tier: SubscriptionTier;
    trialEnd: Date | null;
    isActive: boolean;
  };
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isTrialActive: boolean;
  isPremiumUser: boolean;
  daysLeftInTrial: number | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  // Get the navigate function from the component that uses this context
  // This is safe because we'll ensure AuthProvider is always within BrowserRouter
  const navigate = useNavigate();

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
          await handleUserSession(session);
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
          await handleUserSession(session);
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

  // Extract user data from session and get profile data from database
  const handleUserSession = async (session: Session) => {
    try {
      const authUser = session.user;
      
      // Get additional user data from profiles table
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('name, role, subscription_tier, trial_end_date')
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
        subscription: {
          tier: (profile?.subscription_tier as SubscriptionTier) || 'free',
          trialEnd: profile?.trial_end_date ? new Date(profile.trial_end_date) : null,
          isActive: true
        }
      };

      setUser(userData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast({
        title: "Error loading profile",
        description: "There was a problem loading your profile data",
        variant: "destructive",
      });
    }
  };

  // Calculate days left in trial
  const daysLeftInTrial = user?.subscription.trialEnd 
    ? Math.max(0, Math.ceil((new Date(user.subscription.trialEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  // Check if user is in active trial
  const isTrialActive = !!user?.subscription.trialEnd && daysLeftInTrial !== null && daysLeftInTrial > 0;
  
  // Check if user has premium subscription
  const isPremiumUser = user?.subscription.tier === 'premium' || user?.subscription.tier === 'basic';

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Check if Supabase is properly configured
      if (!isSupabaseConfigured()) {
        // Demo mode - simulate successful login
        setTimeout(() => {
          const demoUser: AuthUser = {
            id: 'demo-user-id',
            email: email,
            name: email.split('@')[0] || 'Demo User',
            role: 'geologist',
            subscription: {
              tier: 'free',
              trialEnd: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
              isActive: true
            }
          };
          setUser(demoUser);
          
          toast({
            title: "Demo login successful",
            description: `Welcome, ${demoUser.name}! (Demo Mode)`,
          });
          
          navigate('/');
        }, 800);
        return;
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Login successful",
        description: `Welcome back, ${user?.name || email.split('@')[0] || 'User'}!`,
      });
      
      navigate('/');
    } catch (error) {
      console.error(error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Check if Supabase is properly configured
      if (!isSupabaseConfigured()) {
        // Demo mode - simulate successful sign up
        setTimeout(() => {
          const demoUser: AuthUser = {
            id: 'demo-user-id',
            email: email,
            name: name,
            role: 'geologist',
            subscription: {
              tier: 'free',
              trialEnd: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
              isActive: true
            }
          };
          setUser(demoUser);
          
          toast({
            title: "Demo account created",
            description: "Your 10-day free trial has started! (Demo Mode)",
          });
          
          navigate('/');
        }, 800);
        return;
      }
      
      // 1. Create the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password
      });
      
      if (authError) {
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error('User registration failed');
      }

      // 2. Create a profile record for the new user
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          name,
          role: 'geologist',
          subscription_tier: 'free',
          trial_end_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
        });

      if (profileError) {
        // If profile creation fails, we should ideally delete the auth user,
        // but Supabase doesn't offer this API publicly, so we'll log the error
        console.error("Failed to create user profile:", profileError);
        throw new Error('Failed to set up your account');
      }
      
      toast({
        title: "Account created",
        description: "Your 10-day free trial has started!",
      });
      
      navigate('/');
    } catch (error) {
      console.error(error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      if (!isSupabaseConfigured()) {
        // Demo mode - simulate successful logout
        setUser(null);
        toast({
          title: "Logged out",
          description: "You have been logged out successfully. (Demo Mode)",
        });
        navigate('/login');
        return;
      }
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw new Error(error.message);
      }
      
      setUser(null);
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast({
        title: "Logout failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    loading,
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
