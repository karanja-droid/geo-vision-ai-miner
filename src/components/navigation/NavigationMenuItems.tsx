
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { 
  getExplorationItems, 
  getResourceItems,
  getDataItems, 
  getAnalysisItems, 
  getResourcesItems, 
  getDirectLinks 
} from './NavigationData';
import { useTranslation } from 'react-i18next';

export const ExplorationMenuItems = () => {
  const { t } = useTranslation();
  const explorationItems = getExplorationItems();
  
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{t('navigation.exploration')}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] grid-cols-2">
          {explorationItems.map((item) => (
            <li key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  to={item.href}
                  className="flex items-center space-x-2 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                >
                  {item.icon}
                  <span>{t(`navigation.${item.title}`)}</span>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export const ResourceMenuItems = () => {
  const { t } = useTranslation();
  const resourceItems = getResourceItems();
  
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{t('navigation.resources')}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] grid-cols-2">
          {resourceItems.map((item) => (
            <li key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  to={item.href}
                  className="flex items-center space-x-2 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                >
                  {item.icon}
                  <span>{t(`navigation.${item.title}`)}</span>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export const DataMenuItems = () => {
  const { t } = useTranslation();
  const dataItems = getDataItems();
  
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{t('navigation.data')}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] grid-cols-2">
          {dataItems.map((item) => (
            <li key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  to={item.href}
                  className="flex items-center space-x-2 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                >
                  {item.icon}
                  <span>{t(`navigation.${item.title}`)}</span>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export const AnalysisMenuItems = () => {
  const { t } = useTranslation();
  const analysisItems = getAnalysisItems();
  
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{t('navigation.analysis')}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] grid-cols-2">
          {analysisItems.map((item) => (
            <li key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  to={item.href}
                  className="flex items-center space-x-2 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                >
                  {item.icon}
                  <span>{t(`navigation.${item.title}`)}</span>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export const SupportMenuItems = () => {
  const { t } = useTranslation();
  const resourcesItems = getResourcesItems();
  
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{t('navigation.support')}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] grid-cols-2">
          {resourcesItems.map((item) => (
            <li key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  to={item.href}
                  className="flex items-center space-x-2 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                >
                  {item.icon}
                  <span>{t(`navigation.${item.title}`)}</span>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export const DirectLinks = () => {
  const { t } = useTranslation();
  const directLinks = getDirectLinks();
  
  return (
    <>
      {directLinks.map((link) => (
        <NavigationMenuItem key={link.href}>
          <Link to={link.href} className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
            {t(`navigation.${link.title}`)}
          </Link>
        </NavigationMenuItem>
      ))}
    </>
  );
};
