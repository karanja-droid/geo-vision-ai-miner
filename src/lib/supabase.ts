
import { createClient } from '@supabase/supabase-js';

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
