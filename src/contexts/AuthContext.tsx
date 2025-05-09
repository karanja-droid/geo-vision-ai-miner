
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type SubscriptionTier = 'free' | 'basic' | 'premium';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role?: string;
  organization?: string;
  subscription?: {
    tier: SubscriptionTier;
    trialEnd: Date | null;
    isActive: boolean;
  };
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isTrialActive: boolean;
  daysLeftInTrial: number;
  isPremiumUser: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>({
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    role: 'User',
    organization: 'Demo Org',
    subscription: {
      tier: 'free',
      trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      isActive: true
    }
  });
  
  const [loading, setLoading] = useState(false);
  
  const isAuthenticated = !!user;
  const isTrialActive = user?.subscription?.isActive || false;
  const daysLeftInTrial = 14;
  const isPremiumUser = user?.subscription?.tier === 'premium';

  const login = async (email: string, password: string) => {
    // Simulate authentication
    setLoading(true);
    try {
      setUser({
        id: '1',
        email,
        name: 'Demo User',
        role: 'User',
        organization: 'Demo Org',
        subscription: {
          tier: 'free',
          trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          isActive: true
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    // Simulate logout
    setLoading(true);
    try {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    // Simulate signup
    setLoading(true);
    try {
      setUser({
        id: '2',
        email,
        name,
        role: 'User',
        organization: '',
        subscription: {
          tier: 'free',
          trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          isActive: true
        }
      });
    } finally {
      setLoading(false);
    }
  };

  // Aliases for consistent naming with other components
  const signIn = login;
  const signUp = signup;
  const signOut = logout;

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isTrialActive, 
      daysLeftInTrial,
      isPremiumUser,
      loading,
      login,
      logout,
      signup,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
