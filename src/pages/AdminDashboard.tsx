
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Import the admin components
import AdminHeader from '@/components/admin/AdminHeader';
import AdminAccessDenied from '@/components/admin/AdminAccessDenied';
import UserManagement from '@/components/admin/UserManagement';
import AccessRequestsManagement from '@/components/admin/AccessRequestsManagement';
import AuditLogsViewer from '@/components/admin/AuditLogsViewer';
import ProtectedRoute from '@/components/ProtectedRoute';

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
        // Fetch user profiles
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (profilesError) {
          throw profilesError;
        }

        setProfiles(profilesData || []);
        
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
        
        // Enrich admin requests with user names
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
          title: "Data loading failed",
          description: "Could not load administrative data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);
  
  const pendingRequestsCount = adminRequests.filter(r => r.status === 'pending').length;
  
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto py-6 px-4 md:px-6">
        <AdminHeader />
        
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="users" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              Access Requests
              {pendingRequestsCount > 0 && (
                <Badge className="ml-2 bg-amber-500">
                  {pendingRequestsCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Audit Logs
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <UserManagement 
              profiles={profiles} 
              loading={loading} 
              setProfiles={setProfiles}
            />
          </TabsContent>
          
          <TabsContent value="requests">
            <AccessRequestsManagement 
              adminRequests={adminRequests}
              loading={loading}
              setAdminRequests={setAdminRequests}
              setProfiles={setProfiles}
              currentUserId={user?.id || ''}
            />
          </TabsContent>
          
          <TabsContent value="audit">
            <AuditLogsViewer 
              auditLogs={auditLogs} 
              loading={loading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
