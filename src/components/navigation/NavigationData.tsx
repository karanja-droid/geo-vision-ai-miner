import React from 'react';
import { 
  BarChart3, Database, Map, FileText, Settings, 
  Globe, FileJson, TableProperties, Layers, Satellite, 
  Building, BookOpen, Info, Route, Mountain
} from "lucide-react";

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
  }
];

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
  },
  {
    title: "3dGeostructure",
    href: "/geostructure-3d",
    icon: <Building className="h-4 w-4" />
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
