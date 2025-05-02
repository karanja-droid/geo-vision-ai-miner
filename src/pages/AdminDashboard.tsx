
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Users, FileText, CheckCircle, XCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import SecurityBanner from '@/components/SecurityBanner';

interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  subscription_tier: string;
  trial_end_date: string | null;
  created_at: string;
}

interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  entity: string;
  entity_id: string;
  details: any;
  created_at: string;
}

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

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [adminRequests, setAdminRequests] = useState<AdminRequest[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch user profiles with email from auth.users
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select(`
            id,
            name,
            role,
            subscription_tier,
            trial_end_date,
            created_at
          `)
          .order('created_at', { ascending: false });
          
        if (profilesError) {
          throw profilesError;
        }

        // For each profile, fetch the email from auth.users using admin functions
        // This would typically be done through a Supabase Edge Function with admin rights
        // For now, we'll enrich them with a placeholder email
        const enhancedProfiles = profilesData.map(profile => ({
          ...profile,
          email: `user-${profile.id.substring(0, 6)}@example.com`, // This is a placeholder
        }));
        
        setProfiles(enhancedProfiles);
        
        // Fetch audit logs
        const { data: logsData, error: logsError } = await supabase
          .from('audit_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);
          
        if (logsError) {
          throw logsError;
        }
        
        setAuditLogs(logsData || []);
        
        // Fetch admin requests
        const { data: requestsData, error: requestsError } = await supabase
          .from('admin_requests')
          .select('*')
          .order('requested_at', { ascending: false });
          
        if (requestsError) {
          throw requestsError;
        }
        
        // Enrich admin requests with user details
        const enrichedRequests = await Promise.all((requestsData || []).map(async (request) => {
          // Get user name from profiles
          const { data: userData } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', request.user_id)
            .single();
            
          return {
            ...request,
            user_name: userData?.name || 'Unknown User'
          };
        }));
        
        setAdminRequests(enrichedRequests);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        toast({
          title: "Error loading data",
          description: "Failed to load administrative data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);
  
  const changeUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
        
      if (error) {
        throw error;
      }
      
      // Update local state
      setProfiles(profiles.map(profile => 
        profile.id === userId ? { ...profile, role: newRole } : profile
      ));
      
      toast({
        title: "Role updated",
        description: `User role has been changed to ${newRole}`,
      });
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Update failed",
        description: "Could not update user role",
        variant: "destructive",
      });
    }
  };
  
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
          resolved_by: user?.id,
          notes: approved ? 'Approved by administrator' : 'Rejected by administrator'
        })
        .eq('id', requestId);
        
      if (requestError) throw requestError;
      
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
        setProfiles(profiles.map(profile => 
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
  
  const getSubscriptionBadge = (tier: string) => {
    switch(tier) {
      case 'premium':
        return <Badge className="bg-primary">Premium</Badge>;
      case 'basic':
        return <Badge className="bg-blue-500">Basic</Badge>;
      default:
        return <Badge className="bg-gray-500">Free</Badge>;
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
  
  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Access Denied
            </CardTitle>
            <CardDescription>
              You don't have permission to view this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This area is restricted to administrators only. If you believe you should have access,
              please contact your system administrator.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Users className="mr-2 h-6 w-6 text-primary" />
        Admin Dashboard
      </h1>
      
      <SecurityBanner />
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="users" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            Access Requests
            {adminRequests.filter(r => r.status === 'pending').length > 0 && (
              <Badge className="ml-2 bg-amber-500">
                {adminRequests.filter(r => r.status === 'pending').length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Audit Logs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts, roles and permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-4">Loading users...</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Subscription</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profiles.map((profile) => (
                        <TableRow key={profile.id}>
                          <TableCell>{profile.name}</TableCell>
                          <TableCell>{profile.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{profile.role}</Badge>
                          </TableCell>
                          <TableCell>
                            {getSubscriptionBadge(profile.subscription_tier)}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => changeUserRole(profile.id, 'admin')}
                                disabled={profile.role === 'admin'}
                              >
                                Make Admin
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => changeUserRole(profile.id, 'geologist')}
                                disabled={profile.role === 'geologist'}
                              >
                                Make Geologist
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Admin Access Requests</CardTitle>
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
        </TabsContent>
        
        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>
                System activity logs for security monitoring.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-4">Loading logs...</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Entity</TableHead>
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auditLogs.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4">
                            No audit logs found
                          </TableCell>
                        </TableRow>
                      ) : (
                        auditLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell>
                              {new Date(log.created_at).toLocaleString()}
                            </TableCell>
                            <TableCell>{log.user_id.substring(0, 8)}...</TableCell>
                            <TableCell>
                              <Badge variant="outline">{log.action}</Badge>
                            </TableCell>
                            <TableCell>{log.entity}</TableCell>
                            <TableCell>
                              <Button size="sm" variant="ghost" onClick={() => {
                                toast({
                                  title: "Log Details",
                                  description: (
                                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-x-auto">
                                      <code className="text-white">
                                        {JSON.stringify(log.details, null, 2)}
                                      </code>
                                    </pre>
                                  ),
                                });
                              }}>
                                View
                              </Button>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
