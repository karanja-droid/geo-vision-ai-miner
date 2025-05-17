
import * as db from '@/lib/supabase/database';
import { useBaseDatabase } from './useBaseDatabase';
import { useAuth } from '@/contexts/auth/useAuth';

export const useOrganizations = () => {
  const { loading, setLoading, handleError, toast } = useBaseDatabase();
  const { user } = useAuth();

  const createOrganization = async (name: string, type: string, description?: string) => {
    try {
      setLoading(true);
      const org = await db.createOrganization(name, type, description);
      toast({
        title: "Organization created",
        description: `${name} has been created successfully.`,
      });
      return org;
    } catch (error) {
      return handleError(error, "Error creating organization");
    } finally {
      setLoading(false);
    }
  };

  const getOrganizations = async () => {
    try {
      setLoading(true);
      return await db.getOrganizations();
    } catch (error) {
      handleError(error, "Error fetching organizations");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const updateUserOrganization = async (organizationId: string) => {
    if (!user?.id) {
      toast({
        title: "Error updating organization",
        description: "You must be logged in to update your organization.",
        variant: "destructive",
      });
      return null;
    }
    
    try {
      setLoading(true);
      const result = await db.updateUserOrganization(user.id, organizationId);
      toast({
        title: "Organization updated",
        description: "Your organization has been updated successfully.",
      });
      return result;
    } catch (error) {
      return handleError(error, "Error updating organization");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createOrganization,
    getOrganizations,
    updateUserOrganization
  };
};
