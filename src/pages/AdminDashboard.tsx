
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Users, FileText } from 'lucide-react';
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

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
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
        // For demo purposes, we'll assume emails are available
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
