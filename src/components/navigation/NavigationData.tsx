
import React from 'react';
import { 
  Database, 
  Layers, 
  Globe, 
  FileText, 
  Map, 
  LineChart, 
  Satellite, 
  Box, 
  BookOpen, 
  Users, 
  Rocket, 
  BarChart 
} from 'lucide-react';

export const getDataItems = () => [
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

export const getAnalysisItems = () => [
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

export const getResourcesItems = () => [
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
