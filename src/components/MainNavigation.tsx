
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { 
  ChevronLeft, 
  Map, 
  Database, 
  BarChart, 
  Globe, 
  BookOpen, 
  Users, 
  Settings,
  LineChart,
  Layers,
  Satellite,
  Box,
  Rocket,
  FileText
} from 'lucide-react';

const MainNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleGoBack = () => {
    navigate(-1);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleGoBack}
        className="mr-2"
        title="Go back"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <NavigationMenu>
        <NavigationMenuList>
          {/* Data Group */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Data</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                <ListItem 
                  href="/data-integration" 
                  title="Data Integration"
                  icon={<Database className="h-4 w-4 mr-2 text-blue-500" />}
                  isActive={isActive('/data-integration')}
                >
                  Import and connect your datasets with our system
                </ListItem>
                <ListItem 
                  href="/dataset-management" 
                  title="Dataset Management"
                  icon={<Layers className="h-4 w-4 mr-2 text-amber-500" />}
                  isActive={isActive('/dataset-management')}
                >
                  Organize and manage your uploaded datasets
                </ListItem>
                <ListItem 
                  href="/global-data-integration" 
                  title="Global Data"
                  icon={<Globe className="h-4 w-4 mr-2 text-green-500" />}
                  isActive={isActive('/global-data-integration')}
                >
                  Access and integrate global geological datasets
                </ListItem>
                <ListItem 
                  href="/gis-shapefile" 
                  title="GIS Shapefiles"
                  icon={<FileText className="h-4 w-4 mr-2 text-purple-500" />}
                  isActive={isActive('/gis-shapefile')}
                >
                  Process GIS shapefiles and generate reports
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          {/* Analysis Group */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Analysis</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                <ListItem 
                  href="/interactive-map" 
                  title="Interactive Map"
                  icon={<Map className="h-4 w-4 mr-2 text-purple-500" />}
                  isActive={isActive('/interactive-map')}
                >
                  Visualize geographic data on interactive maps
                </ListItem>
                <ListItem 
                  href="/next-steps" 
                  title="Analysis Pipeline"
                  icon={<LineChart className="h-4 w-4 mr-2 text-indigo-500" />}
                  isActive={isActive('/next-steps')}
                >
                  Follow the recommended analysis workflow
                </ListItem>
                <ListItem 
                  href="/satellite-vision" 
                  title="Satellite Vision"
                  icon={<Satellite className="h-4 w-4 mr-2 text-sky-500" />}
                  isActive={isActive('/satellite-vision')}
                >
                  AI-powered satellite imagery analysis
                </ListItem>
                <ListItem 
                  href="/geostructure-3d" 
                  title="3D Geostructure"
                  icon={<Box className="h-4 w-4 mr-2 text-rose-500" />}
                  isActive={isActive('/geostructure-3d')}
                >
                  3D visualization of geological structures
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          {/* Resources Group */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                <ListItem 
                  href="/documentation" 
                  title="Documentation"
                  icon={<BookOpen className="h-4 w-4 mr-2 text-orange-500" />}
                  isActive={isActive('/documentation')}
                >
                  Learn how to use all features effectively
                </ListItem>
                <ListItem 
                  href="/documentation?tab=gis-shapefiles" 
                  title="GIS Shapefile Docs"
                  icon={<FileText className="h-4 w-4 mr-2 text-purple-500" />}
                  isActive={false}
                >
                  Documentation for GIS shapefile processing
                </ListItem>
                <ListItem 
                  href="/about" 
                  title="About Us"
                  icon={<Users className="h-4 w-4 mr-2 text-teal-500" />}
                  isActive={isActive('/about')}
                >
                  Learn about our mission and team
                </ListItem>
                <ListItem 
                  href="/product-roadmap" 
                  title="Product Roadmap"
                  icon={<Rocket className="h-4 w-4 mr-2 text-red-500" />}
                  isActive={isActive('/product-roadmap')}
                >
                  See our future plans and developments
                </ListItem>
                <ListItem 
                  href="/upgrade" 
                  title="Plans & Pricing"
                  icon={<BarChart className="h-4 w-4 mr-2 text-emerald-500" />}
                  isActive={isActive('/upgrade')}
                >
                  Upgrade your subscription for more features
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          {/* Direct Link - Dashboard */}
          <NavigationMenuItem>
            <Link 
              to="/" 
              className={cn(
                navigationMenuTriggerStyle(),
                isActive('/') ? "bg-accent text-accent-foreground" : ""
              )}
            >
              Dashboard
            </Link>
          </NavigationMenuItem>

          {/* User Profile */}
          <NavigationMenuItem>
            <Link 
              to="/user-profile" 
              className={cn(
                navigationMenuTriggerStyle(),
                isActive('/user-profile') ? "bg-accent text-accent-foreground" : ""
              )}
            >
              Profile
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

// Enhanced ListItem component with icon support
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { 
    title: string;
    icon?: React.ReactNode;
    isActive?: boolean;
  }
>(({ className, title, children, icon, href, isActive = false, ...props }, ref) => {
  return (
    <li>
      <Link
        to={href || "#"}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
          isActive 
            ? "bg-accent text-accent-foreground" 
            : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none flex items-center">
          {icon}
          {title}
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
          {children}
        </p>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default MainNavigation;
