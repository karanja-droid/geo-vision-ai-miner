
export type SubscriptionTier = 'free' | 'basic' | 'premium';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  organization?: string;
  subscription: {
    tier: SubscriptionTier;
    trialEnd: Date | null;
    isActive: boolean;
  };
}

export interface AuthContextType {
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
