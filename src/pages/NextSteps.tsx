
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Database, Layers, Map, Image } from 'lucide-react';
import { Link } from 'react-router-dom';

const NextSteps: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link to="/">
              <ArrowLeft size={16} />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Next Steps for a Real System</h1>
        </div>
      </div>

      <Tabs defaultValue="data" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="data">Data Integration</TabsTrigger>
          <TabsTrigger value="tech">Technical Infrastructure</TabsTrigger>
          <TabsTrigger value="implementation">Implementation Roadmap</TabsTrigger>
          <TabsTrigger value="partners">Partnership Strategy</TabsTrigger>
        </TabsList>

        <TabsContent value="data" className="min-h-[600px]">
          <Card>
            <CardHeader>
              <CardTitle>Real Data Integration Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Geological Survey Integration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="data-source-card p-4 border rounded-lg flex items-start space-x-3">
                    <div className="p-2 rounded-md bg-primary/10 text-primary">
                      <Map size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">GIS Shapefiles</h4>
                      <p className="text-sm text-muted-foreground">Geological maps, fault lines, and structural features from national surveys</p>
                      <div className="mt-1 text-xs text-muted-foreground">Format: .shp, .kml, .geojson</div>
                    </div>
                  </div>
                  <div className="data-source-card p-4 border rounded-lg flex items-start space-x-3">
                    <div className="p-2 rounded-md bg-primary/10 text-primary">
                      <Database size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">Geochemical Assays</h4>
                      <p className="text-sm text-muted-foreground">Lab results from field samples including mineral content and soil composition</p>
                      <div className="mt-1 text-xs text-muted-foreground">Format: CSV, Excel, SQL databases</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Remote Sensing Data Sources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="data-source-card p-4 border rounded-lg flex items-start space-x-3">
                    <div className="p-2 rounded-md bg-primary/10 text-primary">
                      <Image size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">Satellite Imagery</h4>
                      <p className="text-sm text-muted-foreground">Multispectral data from Landsat and Sentinel-2 for mineral signature detection</p>
                      <div className="mt-1 text-xs text-muted-foreground">Sources: NASA Earth Data, ESA Copernicus</div>
                    </div>
                  </div>
                  <div className="data-source-card p-4 border rounded-lg flex items-start space-x-3">
                    <div className="p-2 rounded-md bg-primary/10 text-primary">
                      <Layers size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">LIDAR Data</h4>
                      <p className="text-sm text-muted-foreground">Digital Elevation Models (DEMs) for accurate topographic mapping</p>
                      <div className="mt-1 text-xs text-muted-foreground">Sources: USGS 3DEP, local surveys</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Historical Drilling Data</h3>
                <p className="text-sm text-muted-foreground">
                  Integration of historical drilling results is critical for model training and validation.
                  This requires standardization of varying formats and quality levels from different sources.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Data Processing Pipeline</h4>
                  <ol className="list-decimal pl-5 space-y-1 text-sm">
                    <li>Collection of raw data from mining companies and geological surveys</li>
                    <li>Standardization into unified data model</li>
                    <li>Quality control and anomaly detection</li>
                    <li>Integration into spatial database</li>
                    <li>Feature engineering for AI model training</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tech" className="min-h-[600px]">
          <Card>
            <CardHeader>
              <CardTitle>Technical Infrastructure Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Data Storage and Processing</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  A production system requires robust geospatial data infrastructure to handle the volume 
                  and complexity of geological data.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Database</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      PostgreSQL with PostGIS extension for spatial data storage and queries
                    </p>
                    <div className="mt-2 text-xs bg-blue-50 text-blue-700 p-2 rounded">
                      Optimized for storing and querying complex geological structures and relationships
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Data Lake</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Cloud storage solution for raw data files (imagery, point clouds, etc.)
                    </p>
                    <div className="mt-2 text-xs bg-blue-50 text-blue-700 p-2 rounded">
                      Enables parallel processing of large datasets for AI training
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Integration Architecture</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  The system requires API connections to various geospatial data services and 
                  processing pipelines to normalize different data formats.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Key Components</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>RESTful API services for data access and manipulation</li>
                    <li>ETL pipelines for ingesting diverse geological data formats</li>
                    <li>Authentication and permissions system for data access control</li>
                    <li>Integration with GIS web services (OGC standards)</li>
                    <li>Webhooks for real-time updates from field equipment</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Visualization Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Advanced Mapping</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Interactive 2D/3D visualization using Mapbox GL, Leaflet, or Cesium JS
                    </p>
                    <div className="mt-2 text-xs">
                      Supports rendering of complex geological layers and ML prediction overlays
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Interactive Analytics</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Custom dashboards with drill-down capabilities for exploring data relationships
                    </p>
                    <div className="mt-2 text-xs">
                      Enables stakeholders to visually explore model results and uncertainty
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation" className="min-h-[600px]">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Roadmap</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Phase 1: Foundation (3-6 months)</h3>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <ol className="list-decimal pl-5 space-y-2 text-sm">
                    <li>
                      <span className="font-medium">Data Infrastructure Setup</span>
                      <p className="text-muted-foreground">Establish geospatial database, data lake, and integration architecture</p>
                    </li>
                    <li>
                      <span className="font-medium">Initial Data Integration</span>
                      <p className="text-muted-foreground">Connect priority data sources (geological surveys, historical mining data)</p>
                    </li>
                    <li>
                      <span className="font-medium">Base Platform Development</span>
                      <p className="text-muted-foreground">Create core user interfaces and visualization capabilities</p>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Phase 2: AI Development (4-8 months)</h3>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <ol className="list-decimal pl-5 space-y-2 text-sm">
                    <li>
                      <span className="font-medium">Model Training Pipeline</span>
                      <p className="text-muted-foreground">Build automated workflows for preprocessing and training models</p>
                    </li>
                    <li>
                      <span className="font-medium">Develop Base Models</span>
                      <p className="text-muted-foreground">Train initial models on selected mineral targets (copper, cobalt)</p>
                    </li>
                    <li>
                      <span className="font-medium">Field Validation Protocol</span>
                      <p className="text-muted-foreground">Establish process for validating model predictions with ground sampling</p>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Phase 3: Pilot Deployment (2-4 months)</h3>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <ol className="list-decimal pl-5 space-y-2 text-sm">
                    <li>
                      <span className="font-medium">Pilot Region Selection</span>
                      <p className="text-muted-foreground">Deploy in high-potential area (e.g., Zambian Copperbelt)</p>
                    </li>
                    <li>
                      <span className="font-medium">User Training & Onboarding</span>
                      <p className="text-muted-foreground">Train field teams and stakeholder organizations</p>
                    </li>
                    <li>
                      <span className="font-medium">Performance Monitoring</span>
                      <p className="text-muted-foreground">Track system performance and prediction accuracy</p>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Phase 4: Scale-Up (6-12 months)</h3>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <ol className="list-decimal pl-5 space-y-2 text-sm">
                    <li>
                      <span className="font-medium">Expand Geographic Coverage</span>
                      <p className="text-muted-foreground">Scale to additional regions based on pilot results</p>
                    </li>
                    <li>
                      <span className="font-medium">Add Mineral Targets</span>
                      <p className="text-muted-foreground">Extend models to additional mineral types</p>
                    </li>
                    <li>
                      <span className="font-medium">Regulatory Integration</span>
                      <p className="text-muted-foreground">Connect with environmental monitoring and compliance systems</p>
                    </li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partners" className="min-h-[600px]">
          <Card>
            <CardHeader>
              <CardTitle>Partnership Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Key Stakeholder Partnerships</h3>
                <p className="text-sm text-muted-foreground">
                  Building a successful mineral exploration AI system requires collaboration across multiple sectors.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Government Agencies</h4>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                      <li>Geological Survey Departments</li>
                      <li>Mining Ministries</li>
                      <li>Environmental Protection Agencies</li>
                      <li>Research Institutions</li>
                    </ul>
                    <div className="mt-2 text-xs bg-green-50 text-green-700 p-2 rounded">
                      Provides regulatory framework and access to national datasets
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Private Sector</h4>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                      <li>Mining Companies</li>
                      <li>Exploration Firms</li>
                      <li>Technology Providers</li>
                      <li>Equipment Manufacturers</li>
                    </ul>
                    <div className="mt-2 text-xs bg-green-50 text-green-700 p-2 rounded">
                      Contributes industry expertise, historical data, and funding
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Academic & Research</h4>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                      <li>Universities with Geoscience Programs</li>
                      <li>AI/ML Research Labs</li>
                      <li>International Research Networks</li>
                    </ul>
                    <div className="mt-2 text-xs bg-green-50 text-green-700 p-2 rounded">
                      Drives innovation in algorithms and validation methodologies
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Local Communities</h4>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                      <li>Community Leaders</li>
                      <li>Indigenous Knowledge Holders</li>
                      <li>Local Environmental Groups</li>
                    </ul>
                    <div className="mt-2 text-xs bg-green-50 text-green-700 p-2 rounded">
                      Provides valuable on-ground insights and ensures social license
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-medium">Funding & Sustainability Model</h3>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Funding Sources</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Public-private partnerships with major mining companies</li>
                    <li>International development grants (World Bank, IFC)</li>
                    <li>Research funding from geoscience institutions</li>
                    <li>Subscription model for commercial users</li>
                    <li>Open access for government and academic partners</li>
                  </ul>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Long-Term Sustainability</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Tiered access model with basic features freely available</li>
                    <li>Premium services for advanced analytics and priority regions</li>
                    <li>Knowledge transfer programs to build local capacity</li>
                    <li>Continuous data improvement through user contributions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NextSteps;
