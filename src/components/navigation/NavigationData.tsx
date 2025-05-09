
import React from 'react';
import { 
  BarChart3, Database, Map, FileText, Settings, 
  Globe, FileJson, TableProperties, Layers, Satellite, 
  Building, BookOpen, Info, Route, Mountain, 
  Compass, Hammer, LayoutDashboard, HelpCircle
} from "lucide-react";

// Exploration focused items
export const getExplorationItems = () => [
  {
    title: "dashboard",
    href: "/",
    icon: <LayoutDashboard className="h-4 w-4" />
  },
  {
    title: "interactiveMap",
    href: "/interactive-map",
    icon: <Map className="h-4 w-4" />
  },
  {
    title: "minesExplorer",
    href: "/mines-explorer",
    icon: <Mountain className="h-4 w-4" />
  },
  {
    title: "fieldSurvey",
    href: "/field-survey",
    icon: <Compass className="h-4 w-4" />
  }
];

// Resource Management items
export const getResourceItems = () => [
  {
    title: "resourceEstimation",
    href: "/resource-estimation",
    icon: <BarChart3 className="h-4 w-4" />
  },
  {
    title: "mineralProcessing",
    href: "/mineral-processing",
    icon: <Hammer className="h-4 w-4" />
  },
  {
    title: "3dGeostructure",
    href: "/geostructure-3d",
    icon: <Building className="h-4 w-4" />
  }
];

// Data Management items
export const getDataItems = () => [
  {
    title: "dataIntegration",
    href: "/data-integration",
    icon: <Database className="h-4 w-4" />
  },
  {
    title: "datasetManagement",
    href: "/dataset-management",
    icon: <TableProperties className="h-4 w-4" />
  },
  {
    title: "globalData",
    href: "/global-data-integration",
    icon: <Globe className="h-4 w-4" />
  },
  {
    title: "gisShapefiles",
    href: "/gis-shapefile",
    icon: <FileJson className="h-4 w-4" />
  }
];

// Analysis tools
export const getAnalysisItems = () => [
  {
    title: "analysisPipeline",
    href: "/analysis-pipeline",
    icon: <Layers className="h-4 w-4" />
  },
  {
    title: "satelliteVision",
    href: "/satellite-vision",
    icon: <Satellite className="h-4 w-4" />
  }
];

export const getResourcesItems = () => [
  {
    title: "documentation",
    href: "/documentation",
    icon: <FileText className="h-4 w-4" />
  },
  {
    title: "shapefileDocs",
    href: "/documentation?tab=gis-shapefiles",
    icon: <BookOpen className="h-4 w-4" />
  },
  {
    title: "aboutUs",
    href: "/about",
    icon: <Info className="h-4 w-4" />
  },
  {
    title: "productRoadmap",
    href: "/product-roadmap",
    icon: <Route className="h-4 w-4" />
  },
  {
    title: "help",
    href: "/help",
    icon: <HelpCircle className="h-4 w-4" />
  }
];

export const getDirectLinks = () => [
  {
    title: "home",
    href: "/"
  },
  {
    title: "profile",
    href: "/user-profile"
  }
];
