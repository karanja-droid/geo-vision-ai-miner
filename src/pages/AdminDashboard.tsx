
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, FileText, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

// Import the admin components
import AdminHeader from '@/components/admin/AdminHeader';
import AdminAccessDenied from '@/components/admin/AdminAccessDenied';
import UserManagement from '@/components/admin/UserManagement';
import AccessRequestsManagement from '@/components/admin/AccessRequestsManagement';
import AuditLogsViewer from '@/components/admin/AuditLogsViewer';
import ProtectedRoute from '@/components/ProtectedRoute';
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
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [adminRequests, setAdminRequests] = useState<AdminRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [securityIssues, setSecurityIssues] = useState<string[]>([]);
  
  // Security check function
  const performSecurityCheck = async () => {
    const issues: string[] = [];
    
    try {
      // Check for users with admin role but no 2FA (mock check)
      const { data: adminsWithout2FA } = await supabase
        .from('profiles')
        .select('id, name')
        .eq('role', 'admin')
        .eq('has_2fa', false);
        
      if (adminsWithout2FA && adminsWithout2FA.length > 0) {
        issues.push(`${adminsWithout2FA.length} admin user(s) without 2FA enabled`);
      }
      
      // Check for failed login attempts (mock check)
      const { data: failedLogins } = await supabase
        .from('audit_logs')
        .select('count')
        .eq('action', 'failed_login')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .single();
        
      if (failedLogins && failedLogins.count > 5) {
        issues.push(`${failedLogins.count} failed login attempts in the last 24 hours`);
      }
      
      setSecurityIssues(issues);
    } catch (error) {
      console.error('Error performing security check:', error);
    }
  };
  
  useEffect(() => {
    // Log access to admin dashboard
    const logAdminAccess = async () => {
      if (!user?.id) return;
      
      try {
        await supabase.rpc('record_audit_log', {
          action: 'admin_access',
          entity: 'admin_dashboard',
          entity_id: 'main',
          details: JSON.stringify({ 
            access_time: new Date().toISOString(),
            user_agent: navigator.userAgent
          })
        });
      } catch (error) {
        console.error('Error logging admin access:', error);
      }
    };
    
    logAdminAccess();
    performSecurityCheck();
    
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
    
    // Set up session check interval - log user out if session expires
    const sessionCheckInterval = setInterval(() => {
      supabase.auth.getSession().then(({ data }) => {
        if (!data.session) {
          toast({
            title: "Session expired",
            description: "Your session has expired. Please log in again.",
            variant: "destructive"
          });
          navigate('/login');
        }
      });
    }, 60000); // Check every minute
    
    return () => clearInterval(sessionCheckInterval);
  }, [toast, navigate, user?.id]);
  
  const pendingRequestsCount = adminRequests.filter(r => r.status === 'pending').length;
  
  return (
    <ProtectedRoute allowedRoles={['admin']} strictRoleCheck={true}>
      <div className="container mx-auto py-6 px-4 md:px-6">
        <AdminHeader />
        
        {securityIssues.length > 0 && (
          <div className="mb-6 bg-amber-50 border border-amber-200 p-4 rounded-md">
            <div className="flex items-center gap-2 text-amber-800 font-medium mb-2">
              <AlertTriangle className="h-5 w-5" />
              <h2>Security Issues Detected</h2>
            </div>
            <ul className="list-disc pl-5 text-sm space-y-1 text-amber-700">
              {securityIssues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>
        )}
        
        <SecurityBanner variant="default" showHelp={false} />
        
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
