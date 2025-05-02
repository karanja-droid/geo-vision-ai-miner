
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, FileText } from 'lucide-react';

// Import the new components
import AdminHeader from '@/components/admin/AdminHeader';
import AdminAccessDenied from '@/components/admin/AdminAccessDenied';
import UserManagement from '@/components/admin/UserManagement';
import AccessRequestsManagement from '@/components/admin/AccessRequestsManagement';
import AuditLogsViewer from '@/components/admin/AuditLogsViewer';

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
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (!user || user.role !== 'admin') {
    return <AdminAccessDenied />;
  }
  
  const pendingRequestsCount = adminRequests.filter(r => r.status === 'pending').length;
  
  return (
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
            currentUserId={user?.id}
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
  );
};

export default AdminDashboard;
