
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { ChevronLeft } from 'lucide-react';

const MainNavigation: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1);
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
                <ListItem href="/data-integration" title="Data Integration">
                  Import and connect your datasets with our system
                </ListItem>
                <ListItem href="/dataset-management" title="Dataset Management">
                  Organize and manage your uploaded datasets
                </ListItem>
                <ListItem href="/global-data-integration" title="Global Data">
                  Access and integrate global geological datasets
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          {/* Analysis Group */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Analysis</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                <ListItem href="/interactive-map" title="Interactive Map">
                  Visualize geographic data on interactive maps
                </ListItem>
                <ListItem href="/next-steps" title="Analysis Pipeline">
                  Follow the recommended analysis workflow
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          {/* Resources Group */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                <ListItem href="/docs" title="Documentation">
                  Learn how to use all features effectively
                </ListItem>
                <ListItem href="/about-us" title="About Us">
                  Learn about our mission and team
                </ListItem>
                <ListItem href="/upgrade" title="Plans & Pricing">
                  Upgrade your subscription for more features
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          {/* Direct Link */}
          <NavigationMenuItem>
            <Link to="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

// Helper component for menu items
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <Link
        to={href || "#"}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default MainNavigation;
