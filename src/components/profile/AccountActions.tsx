
import React, { useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { ShieldAlert } from 'lucide-react';

const AccountActions: React.FC = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [requestingSent, setRequestingSent] = useState(false);

  const handleSignOutEverywhere = async () => {
    try {
      if (isSupabaseConfigured()) {
        await supabase.auth.signOut({ scope: 'global' });
        await signOut();
      } else {
        await signOut();
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
  
  const handleRequestAdminAccess = async () => {
    try {
      if (isSupabaseConfigured()) {
        // In production, this would create a request in the database
        const { error } = await supabase
          .from('admin_requests')
          .insert([{ 
            user_id: user?.id,
            user_email: user?.email,
            status: 'pending'
          }])
          .select();
          
        if (error) throw error;
      }
      
      setRequestingSent(true);
      toast({
        title: "Request submitted",
        description: "Your request for admin access has been submitted for review.",
      });
    } catch (error) {
      console.error('Error requesting admin access:', error);
      toast({
        title: "Request failed",
        description: "Could not submit your request at this time. Please try again later.",
        variant: "destructive",
      });
    }
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
        
        {user?.role !== 'admin' && !requestingSent && (
          <>
            <div>
              <h3 className="text-lg font-medium flex items-center">
                <ShieldAlert className="mr-2 h-5 w-5 text-blue-500" />
                Admin Access
              </h3>
              <p className="text-sm text-muted-foreground">
                Request administrative privileges for your account.
              </p>
              <Button 
                variant="outline" 
                className="mt-2"
                onClick={handleRequestAdminAccess}
              >
                Request Admin Access
              </Button>
            </div>
            
            <Separator />
          </>
        )}
        
        {requestingSent && (
          <>
            <div>
              <h3 className="text-lg font-medium flex items-center">
                <ShieldAlert className="mr-2 h-5 w-5 text-blue-500" />
                Admin Access
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-blue-50">Request Pending</Badge>
                <p className="text-sm text-muted-foreground">
                  Your admin access request is being reviewed.
                </p>
              </div>
            </div>
            
            <Separator />
          </>
        )}
        
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
