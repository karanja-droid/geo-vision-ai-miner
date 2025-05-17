
import { supabase } from '@/lib/supabase';

// User profile management - extending the existing getUserProfile function
export const updateUserOrganization = async (
  userId: string, 
  organizationId: string
) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ organization_id: organizationId })
    .eq('id', userId);
    
  if (error) {
    console.error('Error updating user organization:', error);
    throw error;
  }
  
  return data;
};

// Organizations management
export const createOrganization = async (
  name: string,
  type: string,
  description?: string
) => {
  const { data, error } = await supabase.from('organizations').insert({
    name,
    type,
    description
  }).select().single();
  
  if (error) {
    console.error('Error creating organization:', error);
    throw error;
  }
  
  return data;
};

export const getOrganizations = async () => {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .order('name', { ascending: true });
  
  if (error) {
    console.error('Error fetching organizations:', error);
    throw error;
  }
  
  return data;
};
