
import React from 'react';
import { 
  Table, TableHeader, TableRow, TableHead, 
  TableBody, TableCell 
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";

interface AdminRequest {
  id: string;
  user_id: string;
  user_email: string;
  status: string;
  requested_at: string;
  resolved_at: string | null;
  notes: string | null;
  user_name?: string;
}

interface AccessRequestsManagementProps {
  adminRequests: AdminRequest[];
  loading: boolean;
  setAdminRequests: React.Dispatch<React.SetStateAction<AdminRequest[]>>;
  setProfiles: React.Dispatch<React.SetStateAction<any[]>>;
  currentUserId: string;
}

const AccessRequestsManagement: React.FC<AccessRequestsManagementProps> = ({
  adminRequests,
  loading,
  setAdminRequests,
  setProfiles,
  currentUserId
}) => {
  const { toast } = useToast();

  const handleAdminRequest = async (requestId: string, userId: string, approved: boolean) => {
    try {
      // Begin transaction
      if (approved) {
        // Update user role to admin
        const { error: roleError } = await supabase
          .from('profiles')
          .update({ role: 'admin' })
          .eq('id', userId);
          
        if (roleError) throw roleError;
      }
      
      // Update request status
      const { error: requestError } = await supabase
        .from('admin_requests')
        .update({ 
          status: approved ? 'approved' : 'rejected',
          resolved_at: new Date().toISOString(),
          resolved_by: currentUserId,
          notes: approved ? 'Approved by administrator' : 'Rejected by administrator'
        })
        .eq('id', requestId);
        
      if (requestError) throw requestError;
      
      // Log this action
      await supabase.rpc('record_audit_log', {
        action: 'update',
        entity: 'admin_request',
        entity_id: requestId,
        details: JSON.stringify({ 
          status: approved ? 'approved' : 'rejected',
          user_id: userId
        })
      });
      
      // Update local state
      setAdminRequests(adminRequests.map(request => 
        request.id === requestId 
          ? { 
              ...request, 
              status: approved ? 'approved' : 'rejected',
              resolved_at: new Date().toISOString()
            } 
          : request
      ));
      
      // If approved, also update the profiles list
      if (approved) {
        setProfiles(profiles => profiles.map(profile => 
          profile.id === userId ? { ...profile, role: 'admin' } : profile
        ));
      }
      
      toast({
        title: approved ? "Request approved" : "Request rejected",
        description: `Admin access request has been ${approved ? 'approved' : 'rejected'}.`,
      });
    } catch (error) {
      console.error('Error processing admin request:', error);
      toast({
        title: "Action failed",
        description: "Could not process the admin request",
        variant: "destructive",
      });
    }
  };

  const getRequestStatusBadge = (status: string) => {
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          Admin Access Requests
        </CardTitle>
        <CardDescription>
          Review and manage requests for admin privileges.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">Loading requests...</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Requested</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No admin access requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  adminRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.user_name}</TableCell>
                      <TableCell>{request.user_email}</TableCell>
                      <TableCell>
                        {new Date(request.requested_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {getRequestStatusBadge(request.status)}
                      </TableCell>
                      <TableCell>
                        {request.status === 'pending' ? (
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleAdminRequest(request.id, request.user_id, true)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleAdminRequest(request.id, request.user_id, false)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            {request.resolved_at 
                              ? `Resolved on ${new Date(request.resolved_at).toLocaleDateString()}`
                              : 'No actions available'}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccessRequestsManagement;
