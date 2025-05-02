
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { AuthUser } from '@/types/auth';
import { createDemoUser, handleUserSession } from '@/utils/authUtils';

export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const signIn = async (email: string, password: string): Promise<AuthUser | null> => {
    setLoading(true);
    try {
      // Check if Supabase is properly configured
      if (!isSupabaseConfigured()) {
        // Demo mode - simulate successful login
        const demoUser = createDemoUser(email);
        
        toast({
          title: "Demo login successful",
          description: `Welcome, ${demoUser.name}! (Demo Mode)`,
        });
        
        navigate('/');
        return demoUser;
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw new Error(error.message);
      }

      if (!data.session) {
        throw new Error('No session returned from Supabase');
      }

      const user = await handleUserSession(data.session);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${user?.name || email.split('@')[0] || 'User'}!`,
      });
      
      navigate('/');
      return user;
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

  const signUp = async (email: string, password: string, name: string): Promise<AuthUser | null> => {
    setLoading(true);
    try {
      // Check if Supabase is properly configured
      if (!isSupabaseConfigured()) {
        // Demo mode - simulate successful sign up
        const demoUser = createDemoUser(email, name);
        
        toast({
          title: "Demo account created",
          description: "Your 10-day free trial has started! (Demo Mode)",
        });
        
        navigate('/');
        return demoUser;
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
      
      if (authData.session) {
        return handleUserSession(authData.session);
      }
      return null;
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

  const signOut = async (): Promise<void> => {
    try {
      if (!isSupabaseConfigured()) {
        // Demo mode - simulate successful logout
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

  return {
    loading,
    signIn,
    signUp,
    signOut
  };
};
