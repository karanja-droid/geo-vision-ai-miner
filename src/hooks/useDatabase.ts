
import { useAuth } from '@/contexts/auth/useAuth';
import { useToast } from '@/hooks/use-toast';
import { 
  useDatasets, 
  useFiles, 
  useGeoPoints, 
  useAnalysis, 
  useOrganizations 
} from './database';

export const useDatabase = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const datasetsHook = useDatasets();
  const filesHook = useFiles();
  const geoPointsHook = useGeoPoints();
  const analysisHook = useAnalysis();
  const organizationsHook = useOrganizations();

  // Determine if any of the hooks are in a loading state
  const loading = 
    datasetsHook.loading || 
    filesHook.loading || 
    geoPointsHook.loading || 
    analysisHook.loading || 
    organizationsHook.loading;

  // User organization update function that requires user context
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
      const result = await import('@/lib/supabase/database').then(db => 
        db.updateUserOrganization(user.id, organizationId)
      );
      toast({
        title: "Organization updated",
        description: "Your organization has been updated successfully.",
      });
      return result;
    } catch (error) {
      toast({
        title: "Error updating organization",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    loading,
    // Dataset functions
    ...datasetsHook,
    // File functions
    ...filesHook,
    // GeoPoint functions
    ...geoPointsHook,
    // Analysis functions
    ...analysisHook,
    // Organization functions
    ...organizationsHook,
    // User organization update function
    updateUserOrganization,
  };
};
