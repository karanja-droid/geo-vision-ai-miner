
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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

// Mock user data for demonstration purposes
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'password123',
    name: 'Admin User',
    role: 'admin',
    subscription: {
      tier: 'premium' as SubscriptionTier,
      trialEnd: null,
      isActive: true
    }
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'password123',
    name: 'Regular User',
    role: 'geologist',
    subscription: {
      tier: 'free' as SubscriptionTier,
      trialEnd: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      isActive: true
    }
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for existing session on initial load
  useEffect(() => {
    const checkSession = () => {
      const storedUser = localStorage.getItem('geoUser');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          // Convert string date back to Date object if it exists
          if (parsedUser.subscription?.trialEnd) {
            parsedUser.subscription.trialEnd = new Date(parsedUser.subscription.trialEnd);
          }
          setUser(parsedUser);
        } catch (error) {
          console.error("Failed to parse stored user:", error);
          localStorage.removeItem('geoUser');
        }
      }
      setLoading(false);
    };

    checkSession();
  }, []);

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
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user in mock data
      const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Create a user object without the password
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Store in local storage
      localStorage.setItem('geoUser', JSON.stringify(userWithoutPassword));
      
      // Update state
      setUser(userWithoutPassword);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });
      
      navigate('/');
    } catch (error) {
      console.error(error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user with trial subscription
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: 'geologist',
        subscription: {
          tier: 'free' as SubscriptionTier,
          trialEnd: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
          isActive: true
        }
      };
      
      // Store in local storage
      localStorage.setItem('geoUser', JSON.stringify(newUser));
      
      // Update state
      setUser(newUser);
      
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
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      // Remove from local storage
      localStorage.removeItem('geoUser');
      
      // Update state
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
