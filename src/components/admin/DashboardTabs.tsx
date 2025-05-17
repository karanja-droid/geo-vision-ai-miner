
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, FileText } from 'lucide-react';
import UserManagement from '@/components/admin/UserManagement';
import AccessRequestsManagement from '@/components/admin/AccessRequestsManagement';
import AuditLogsViewer from '@/components/admin/AuditLogsViewer';
import { AdminDashboardState } from '@/hooks/useAdminDashboardState';

interface DashboardTabsProps {
  dashboardState: AdminDashboardState;
  currentUserId: string;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ 
  dashboardState, 
  currentUserId 
}) => {
  const { 
    profiles, 
    adminRequests, 
    auditLogs, 
    loading, 
    pendingRequestsCount, 
    setProfiles, 
    setAdminRequests 
  } = dashboardState;

  return (
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
          currentUserId={currentUserId}
        />
      </TabsContent>
      
      <TabsContent value="audit">
        <AuditLogsViewer 
          auditLogs={auditLogs} 
          loading={loading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
