
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const AccountActions: React.FC = () => {
  const { signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOutEverywhere = async () => {
    try {
      if (isSupabaseConfigured()) {
        await supabase.auth.signOut({ scope: 'global' });
        signOut();
      } else {
        signOut();
      }
      
      toast({
        title: "Signed out",
        description: "You've been signed out from all devices",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Sign out failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion",
      description: "Please contact support to delete your account.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Actions</CardTitle>
        <CardDescription>
          Manage your account access
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Sign out from all devices</h3>
          <p className="text-sm text-muted-foreground">
            This will sign you out from all devices where you're currently logged in.
          </p>
          <Button 
            variant="outline" 
            className="mt-2"
            onClick={handleSignOutEverywhere}
          >
            Sign Out Everywhere
          </Button>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
          <p className="text-sm text-muted-foreground">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button 
            variant="destructive" 
            className="mt-2"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountActions;
