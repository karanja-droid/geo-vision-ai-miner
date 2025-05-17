
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthUser } from '@/types/auth';

// Default to empty strings if environment variables are not available
// In production, these should be properly set in your environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create a Supabase client with the provided URL and anon key
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if Supabase is configured properly
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://your-project-id.supabase.co' && 
         supabaseAnonKey !== 'your-anon-key' &&
         supabaseUrl.includes('supabase.co');
};

// Get user profile data from Supabase
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data;
};

// Update user profile data in Supabase
export const updateUserProfile = async (userId: string, updates: Record<string, any>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
    
  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
  
  return data;
};

// Function to map Supabase user data to our AuthUser type
export const mapSupabaseUser = async (supabaseUser: any): Promise<AuthUser | null> => {
  if (!supabaseUser) return null;
  
  // Fetch the user's profile from our profiles table
  const profile = await getUserProfile(supabaseUser.id);
  
  if (!profile) {
    console.error('No profile found for user:', supabaseUser.id);
    return null;
  }
  
  // Map to our AuthUser type
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    name: profile.name || supabaseUser.email?.split('@')[0] || 'User',
    role: profile.role || 'user',
    organization: profile.organization,
    subscription: {
      tier: profile.subscription_tier || 'free',
      trialEnd: profile.trial_end_date ? new Date(profile.trial_end_date) : null,
      isActive: true
    }
  };
};
