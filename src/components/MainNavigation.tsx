
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import BackButton from '@/components/navigation/BackButton';
import { 
  DataMenuItems,
  AnalysisMenuItems,
  ResourcesMenuItems,
  DirectLinks
} from '@/components/navigation/NavigationMenuItems';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MainNavigation: React.FC = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex items-center">
        <BackButton />
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85%] max-w-[300px] pt-10 z-[100]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h3 className="mb-1 px-4 text-lg font-semibold">Data</h3>
                <MobileNavigationGroup />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="mb-1 px-4 text-lg font-semibold">Analysis</h3>
                <MobileNavigationGroup type="analysis" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="mb-1 px-4 text-lg font-semibold">Resources</h3>
                <MobileNavigationGroup type="resources" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="mb-1 px-4 text-lg font-semibold">Quick Links</h3>
                <MobileDirectLinks />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <BackButton />
      
      <NavigationMenu>
        <NavigationMenuList>
          {/* Data Group */}
          <DataMenuItems />
          
          {/* Analysis Group */}
          <AnalysisMenuItems />
          
          {/* Resources Group */}
          <ResourcesMenuItems />
          
          {/* Direct Links */}
          <DirectLinks />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

// Mobile navigation group component
const MobileNavigationGroup: React.FC<{type?: 'data' | 'analysis' | 'resources'}> = ({ type = 'data' }) => {
  const items = getMobileNavItems(type);
  
  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <Button
          key={item.title}
          variant="ghost"
          asChild
          className="justify-start px-4 py-2 h-auto text-left"
        >
          <a href={item.href} className="flex items-center gap-3">
            {item.icon}
            <span>{item.title}</span>
          </a>
        </Button>
      ))}
    </div>
  );
};

// Mobile direct links component
const MobileDirectLinks: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Button
        variant="ghost"
        asChild
        className="justify-start px-4 py-2 h-auto text-left"
      >
        <a href="/" className="flex items-center gap-3">
          Dashboard
        </a>
      </Button>
      <Button
        variant="ghost"
        asChild
        className="justify-start px-4 py-2 h-auto text-left"
      >
        <a href="/user-profile" className="flex items-center gap-3">
          Profile
        </a>
      </Button>
    </div>
  );
};

// Function to get mobile nav items based on type
const getMobileNavItems = (type: 'data' | 'analysis' | 'resources') => {
  const { Database, Layers, Globe, FileText, Map, LineChart, Satellite, Box, BookOpen, Users, Rocket, BarChart } = require('lucide-react');
  
  if (type === 'data') {
    return [
      {
        title: "Data Integration",
        href: "/data-integration",
        icon: <Database className="h-4 w-4 text-blue-500" />
      },
      {
        title: "Dataset Management",
        href: "/dataset-management",
        icon: <Layers className="h-4 w-4 text-amber-500" />
      },
      {
        title: "Global Data",
        href: "/global-data-integration",
        icon: <Globe className="h-4 w-4 text-green-500" />
      },
      {
        title: "GIS Shapefiles",
        href: "/gis-shapefile",
        icon: <FileText className="h-4 w-4 text-purple-500" />
      }
    ];
  }
  
  if (type === 'analysis') {
    return [
      {
        title: "Interactive Map",
        href: "/interactive-map",
        icon: <Map className="h-4 w-4 text-purple-500" />
      },
      {
        title: "Analysis Pipeline",
        href: "/next-steps",
        icon: <LineChart className="h-4 w-4 text-indigo-500" />
      },
      {
        title: "Satellite Vision",
        href: "/satellite-vision",
        icon: <Satellite className="h-4 w-4 text-sky-500" />
      },
      {
        title: "3D Geostructure",
        href: "/geostructure-3d",
        icon: <Box className="h-4 w-4 text-rose-500" />
      }
    ];
  }
  
  return [
    {
      title: "Documentation",
      href: "/documentation",
      icon: <BookOpen className="h-4 w-4 text-orange-500" />
    },
    {
      title: "About Us",
      href: "/about",
      icon: <Users className="h-4 w-4 text-teal-500" />
    },
    {
      title: "Product Roadmap",
      href: "/product-roadmap",
      icon: <Rocket className="h-4 w-4 text-red-500" />
    },
    {
      title: "Plans & Pricing",
      href: "/upgrade",
      icon: <BarChart className="h-4 w-4 text-emerald-500" />
    }
  ];
};

export default MainNavigation;
