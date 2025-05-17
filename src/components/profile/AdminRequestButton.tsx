
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AdminRequestButton: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [existingRequest, setExistingRequest] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkExistingRequest = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('admin_requests')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (!error && data) {
          setExistingRequest(data);
        }
      } catch (error) {
        console.error('Error checking admin request:', error);
      }
    };
    
    checkExistingRequest();
  }, [user]);

  const requestAdminAccess = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('admin_requests')
        .insert({
          user_id: user.id,
          user_email: user.email,
          status: 'pending'
        })
        .select()
        .single();
        
      if (error) throw error;
      
      setExistingRequest(data);
      
      // Log this action
      await supabase.rpc('record_audit_log', {
        action: 'create',
        entity: 'admin_request',
        entity_id: data.id,
        details: JSON.stringify({ user_id: user.id })
      });
      
      toast({
        title: "Request submitted",
        description: "Your request for admin access has been submitted for review.",
      });
    } catch (error) {
      console.error('Error submitting admin request:', error);
      toast({
        title: "Request failed",
        description: "Could not submit your admin access request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (user?.role === 'admin') {
    return null; // Don't show anything if user is already an admin
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge className="bg-amber-500">Pending</Badge>;
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Admin Access
        </CardTitle>
      </CardHeader>
      <CardContent>
        {existingRequest ? (
          <div className="space-y-2">
            <div className="flex items-center">
              <p className="mr-2">Status:</p> 
              {getStatusBadge(existingRequest.status)}
            </div>
            <p className="text-sm text-muted-foreground">
              Request submitted on {new Date(existingRequest.requested_at).toLocaleDateString()}
            </p>
            {existingRequest.status === 'pending' && (
              <p className="text-sm">Your request is being reviewed by administrators.</p>
            )}
            {existingRequest.status === 'approved' && (
              <p className="text-sm text-green-600">
                Your request was approved. Please log out and log back in to apply the changes.
              </p>
            )}
            {existingRequest.status === 'rejected' && (
              <p className="text-sm text-red-600">
                Your request was declined. Please contact an administrator for more information.
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm mb-4">
            Request administrator privileges for your account. This will allow you to 
            manage users and access advanced system settings.
          </p>
        )}
      </CardContent>
      {!existingRequest && (
        <CardFooter>
          <Button 
            onClick={requestAdminAccess} 
            disabled={loading}
            className="w-full"
          >
            <Shield className="mr-2 h-4 w-4" />
            Request Admin Access
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AdminRequestButton;
