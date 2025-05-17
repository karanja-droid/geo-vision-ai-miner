
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
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

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  badge?: string | number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  to, 
  icon, 
  label, 
  isActive,
  badge
}) => {
  return (
    <Link 
      to={to}
      className={cn(
        "flex items-center py-2 px-3 rounded-md text-sm font-medium",
        "hover:bg-accent/50 transition-colors relative",
        isActive 
          ? "bg-accent text-accent-foreground" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <div className="mr-3 text-current">{icon}</div>
      <span>{label}</span>
      {badge && (
        <span className="ml-auto bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
};

const SidebarGroupTitle: React.FC<{ title: string }> = ({ title }) => {
  const { t } = useTranslation();
  return (
    <h3 className="px-3 mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
      {t(`navigation.${title.toLowerCase()}`)}
    </h3>
  );
};

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
      <div className="mb-6">
        <SidebarGroupTitle title="Data" />
        <div className="space-y-1 mt-1 px-3">
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
        </div>
      </div>
      
      {/* Analysis Group */}
      <div className="mb-6">
        <SidebarGroupTitle title="Analysis" />
        <div className="space-y-1 mt-1 px-3">
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
        </div>
      </div>
      
      {/* Explore Group */}
      <div className="mb-6">
        <SidebarGroupTitle title="Explore" />
        <div className="space-y-1 mt-1 px-3">
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
        </div>
      </div>
      
      {/* Collaboration & Workflow Group */}
      <div className="mb-6">
        <SidebarGroupTitle title="Collaboration" />
        <div className="space-y-1 mt-1 px-3">
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
        </div>
      </div>
      
      {/* Resources Group */}
      <div className="mb-6">
        <SidebarGroupTitle title="Resources" />
        <div className="space-y-1 mt-1 px-3">
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
        </div>
      </div>
      
      {/* Admin Group - Only visible to admin users */}
      {isAdmin && (
        <div className="mb-6">
          <SidebarGroupTitle title="Admin" />
          <div className="space-y-1 mt-1 px-3">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowSidebar;
