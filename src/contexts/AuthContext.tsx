
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isTrialActive: boolean;
  daysLeftInTrial: number;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>({
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    role: 'User'
  });
  
  const isAuthenticated = !!user;
  const isTrialActive = true;
  const daysLeftInTrial = 14;

  const login = async (email: string, password: string) => {
    // Simulate authentication
    setUser({
      id: '1',
      email,
      name: 'Demo User',
      role: 'User'
    });
  };

  const logout = async () => {
    // Simulate logout
    setUser(null);
  };

  const signup = async (email: string, password: string, name: string) => {
    // Simulate signup
    setUser({
      id: '2',
      email,
      name,
      role: 'User'
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isTrialActive, 
      daysLeftInTrial,
      login,
      logout,
      signup
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
