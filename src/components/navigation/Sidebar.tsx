
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Map,
  Database,
  Layers,
  BarChart3,
  Settings,
  Mountain,
  Compass,
  FileJson,
  Users,
  Globe,
  FileText,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isCollapsed }) => {
  return (
    <Link 
      to={to}
      className={cn(
        "flex items-center py-3 px-4 rounded-md text-sm font-medium",
        "hover:bg-accent/50 transition-colors",
        "text-muted-foreground hover:text-foreground"
      )}
    >
      <div className="mr-3">{icon}</div>
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

const NavSection: React.FC<{ title: string; isCollapsed: boolean; children: React.ReactNode }> = ({ 
  title, 
  isCollapsed,
  children 
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="mb-6">
      {!isCollapsed && (
        <h3 className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t(`navigation.${title.toLowerCase()}`)}
        </h3>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ 
  className, 
  isCollapsed,
  toggleCollapse
}) => {
  const { t } = useTranslation();
  const iconSize = 18;
  
  return (
    <aside 
      className={cn(
        "border-r h-screen transition-all duration-300 ease-in-out overflow-y-auto",
        isCollapsed ? "w-[60px]" : "w-[240px]",
        className
      )}
    >
      <div className="p-4">
        <button 
          onClick={toggleCollapse} 
          className="w-full flex items-center justify-center p-2 rounded-md hover:bg-accent"
        >
          <div className={`h-5 w-5 transition-transform ${isCollapsed ? "" : "rotate-180"}`}>
            {isCollapsed ? "→" : "←"}
          </div>
        </button>
      </div>

      <div className="px-2">
        <NavSection title="Exploration" isCollapsed={isCollapsed}>
          <NavItem 
            to="/" 
            icon={<LayoutDashboard size={iconSize} />} 
            label={t('navigation.dashboard')}
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/interactive-map" 
            icon={<Map size={iconSize} />} 
            label={t('navigation.interactiveMap')}
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/mines-explorer" 
            icon={<Mountain size={iconSize} />} 
            label={t('navigation.minesExplorer')}
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/field-survey" 
            icon={<Compass size={iconSize} />} 
            label={t('navigation.fieldSurvey')}
            isCollapsed={isCollapsed}
          />
        </NavSection>

        <NavSection title="Data" isCollapsed={isCollapsed}>
          <NavItem 
            to="/data-integration" 
            icon={<Database size={iconSize} />} 
            label={t('navigation.dataIntegration')}
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/dataset-management" 
            icon={<Layers size={iconSize} />} 
            label={t('navigation.datasetManagement')}
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/global-data-integration" 
            icon={<Globe size={iconSize} />} 
            label={t('navigation.globalData')}
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/gis-shapefile" 
            icon={<FileJson size={iconSize} />} 
            label={t('navigation.gisShapefiles')}
            isCollapsed={isCollapsed}
          />
        </NavSection>

        <NavSection title="Analysis" isCollapsed={isCollapsed}>
          <NavItem 
            to="/analysis" 
            icon={<BarChart3 size={iconSize} />} 
            label={t('navigation.analysis')}
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/resource-estimation" 
            icon={<BarChart3 size={iconSize} />} 
            label={t('navigation.resourceEstimation')}
            isCollapsed={isCollapsed}
          />
        </NavSection>

        <NavSection title="Support" isCollapsed={isCollapsed}>
          <NavItem 
            to="/documentation" 
            icon={<FileText size={iconSize} />} 
            label={t('navigation.documentation')}
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/help" 
            icon={<HelpCircle size={iconSize} />} 
            label={t('navigation.help')}
            isCollapsed={isCollapsed}
          />
        </NavSection>

        <NavSection title="Admin" isCollapsed={isCollapsed}>
          <NavItem 
            to="/user-profile" 
            icon={<Users size={iconSize} />} 
            label={t('common.profile')}
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/admin-dashboard" 
            icon={<Settings size={iconSize} />} 
            label={t('navigation.adminDashboard')}
            isCollapsed={isCollapsed}
          />
        </NavSection>
      </div>
    </aside>
  );
};
