
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import SecurityBanner from '@/components/SecurityBanner';
import AdminHeader from '@/components/admin/AdminHeader';
import SecurityIssuesBanner from '@/components/admin/SecurityIssuesBanner';
import DashboardTabs from '@/components/admin/DashboardTabs';
import { useAdminDashboardState } from '@/hooks/useAdminDashboardState';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const dashboardState = useAdminDashboardState();
  const { securityIssues } = dashboardState;
  
  return (
    <ProtectedRoute allowedRoles={['admin']} strictRoleCheck={true}>
      <div className="container mx-auto py-6 px-4 md:px-6">
        <AdminHeader />
        
        <SecurityIssuesBanner securityIssues={securityIssues} />
        
        <SecurityBanner variant="default" showHelp={false} />
        
        <DashboardTabs 
          dashboardState={dashboardState} 
          currentUserId={user?.id || ''}
        />
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
