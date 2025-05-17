
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Database,
  Upload,
  Globe,
  FileJson,
  BrainCircuit,
  BarChart3,
  Map,
  Mountain,
  ClipboardList,
  MessageSquare,
  AlertTriangle,
  BookOpen,
  Milestone,
  Info,
  ShieldCheck,
  Users,
  FileSearch,
  ScrollText,
  Settings
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import SidebarGroup from './SidebarGroup';

const WorkflowSidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useTranslation();
  const iconSize = 18;
  
  const isAdmin = user?.role === 'admin';
  const currentPath = location.pathname;
  
  const isActive = (path: string) => currentPath === path;
  
  return (
    <div className="h-full overflow-y-auto py-4">
      {/* Dashboard */}
      <div className="px-3 mb-6">
        <SidebarItem 
          to="/"
          icon={<LayoutDashboard size={iconSize} />}
          label={t('navigation.dashboard')}
          isActive={isActive('/')}
        />
      </div>
      
      {/* Data Group */}
      <SidebarGroup title="Data">
        <SidebarItem
          to="/dataset-management"
          icon={<Database size={iconSize} />}
          label={t('navigation.datasetLibrary')}
          isActive={isActive('/dataset-management')}
        />
        <SidebarItem
          to="/upload-data"
          icon={<Upload size={iconSize} />}
          label={t('navigation.uploadData')}
          isActive={isActive('/upload-data')}
        />
        <SidebarItem
          to="/data-integration"
          icon={<Globe size={iconSize} />}
          label={t('navigation.dataIntegration')}
          isActive={isActive('/data-integration')}
        />
        <SidebarItem
          to="/gis-shapefile"
          icon={<FileJson size={iconSize} />}
          label={t('navigation.gisTools')}
          isActive={isActive('/gis-shapefile')}
        />
      </SidebarGroup>
      
      {/* Analysis Group */}
      <SidebarGroup title="Analysis">
        <SidebarItem
          to="/run-analysis"
          icon={<BrainCircuit size={iconSize} />}
          label={t('navigation.runAiAnalysis')}
          isActive={isActive('/run-analysis')}
        />
        <SidebarItem
          to="/analysis"
          icon={<BarChart3 size={iconSize} />}
          label={t('navigation.analysisResults')}
          isActive={isActive('/analysis')}
        />
      </SidebarGroup>
      
      {/* Explore Group */}
      <SidebarGroup title="Explore">
        <SidebarItem
          to="/interactive-map"
          icon={<Map size={iconSize} />}
          label={t('navigation.interactiveMap')}
          isActive={isActive('/interactive-map')}
        />
        <SidebarItem
          to="/mines-explorer"
          icon={<Mountain size={iconSize} />}
          label={t('navigation.minesExplorer')}
          isActive={isActive('/mines-explorer')}
          badge="New"
        />
      </SidebarGroup>
      
      {/* Collaboration & Workflow Group */}
      <SidebarGroup title="Collaboration">
        <SidebarItem
          to="/tasks"
          icon={<ClipboardList size={iconSize} />}
          label={t('navigation.tasksWorkflows')}
          isActive={isActive('/tasks')}
        />
        <SidebarItem
          to="/communication"
          icon={<MessageSquare size={iconSize} />}
          label={t('navigation.communication')}
          isActive={isActive('/communication')}
        />
        <SidebarItem
          to="/conflict-resolution"
          icon={<AlertTriangle size={iconSize} />}
          label={t('navigation.conflictResolution')}
          isActive={isActive('/conflict-resolution')}
        />
      </SidebarGroup>
      
      {/* Resources Group */}
      <SidebarGroup title="Resources">
        <SidebarItem
          to="/documentation"
          icon={<BookOpen size={iconSize} />}
          label={t('navigation.documentation')}
          isActive={isActive('/documentation')}
        />
        <SidebarItem
          to="/product-roadmap"
          icon={<Milestone size={iconSize} />}
          label={t('navigation.productRoadmap')}
          isActive={isActive('/product-roadmap')}
        />
        <SidebarItem
          to="/about"
          icon={<Info size={iconSize} />}
          label={t('navigation.about')}
          isActive={isActive('/about')}
        />
      </SidebarGroup>
      
      {/* Admin Group - Only visible to admin users */}
      {isAdmin && (
        <SidebarGroup title="Admin">
          <SidebarItem
            to="/admin-dashboard"
            icon={<ShieldCheck size={iconSize} />}
            label={t('navigation.adminDashboard')}
            isActive={isActive('/admin-dashboard')}
          />
          <SidebarItem
            to="/user-management"
            icon={<Users size={iconSize} />}
            label={t('navigation.userManagement')}
            isActive={isActive('/user-management')}
          />
          <SidebarItem
            to="/access-requests"
            icon={<FileSearch size={iconSize} />}
            label={t('navigation.accessRequests')}
            isActive={isActive('/access-requests')}
          />
          <SidebarItem
            to="/audit-logs"
            icon={<ScrollText size={iconSize} />}
            label={t('navigation.auditLogs')}
            isActive={isActive('/audit-logs')}
          />
          <SidebarItem
            to="/system-config"
            icon={<Settings size={iconSize} />}
            label={t('navigation.systemConfig')}
            isActive={isActive('/system-config')}
          />
        </SidebarGroup>
      )}
    </div>
  );
};

export default WorkflowSidebar;
