
import React, { useState, useEffect, ReactNode } from 'react';
import { supabase, mapSupabaseUser } from '@/lib/supabase';
import { AuthUser } from '@/types/auth';
import AuthContext from './AuthContext';
import { calculateDaysLeftInTrial, isTrialActive, isPremiumUser } from './authUtils';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Check for a user session when the component mounts
  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      
      try {
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (session?.user) {
          const authUser = await mapSupabaseUser(session.user);
          setUser(authUser);
        }
      } catch (error) {
        console.error('Error checking authentication session:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const authUser = await mapSupabaseUser(session.user);
        setUser(authUser);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });
    
    // Clean up subscription when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const isAuthenticated = !!user;
  const daysLeftInTrial = calculateDaysLeftInTrial(user);
  const userIsTrialActive = isTrialActive(daysLeftInTrial);
  const userIsPremiumUser = isPremiumUser(user);

  // Login with email and password
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.user) {
        const authUser = await mapSupabaseUser(data.user);
        setUser(authUser);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email, password and name
  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    
    try {
      // Create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      if (!data?.user) {
        throw new Error('Sign up failed. No user returned.');
      }
      
      // Create profile entry
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            name,
            role: 'geologist',
            subscription_tier: 'free',
            trial_end_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days trial
          }
        ]);
      
      if (profileError) {
        console.error('Error creating user profile:', profileError);
        throw profileError;
      }
      
      // Log the user in
      await login(email, password);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Password reset
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  // Aliases for consistent naming
  const signIn = login;
  const signUp = signup;
  const signOut = logout;

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isTrialActive: userIsTrialActive, 
      daysLeftInTrial,
      isPremiumUser: userIsPremiumUser,
      loading,
      login,
      logout,
      signup,
      signIn,
      signUp,
      signOut,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
