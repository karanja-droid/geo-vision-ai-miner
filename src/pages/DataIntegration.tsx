
import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Layers, Database, Image, CloudUpload, Slack, Teams } from "lucide-react";

const DataIntegration: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Data Integration Hub</h1>
            <p className="text-muted-foreground">Connect real-world geological data sources with cloud-based AI processing</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/">Back to Dashboard</Link>
          </Button>
        </div>

        <Tabs defaultValue="data-sources">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="data-sources">Data Sources</TabsTrigger>
            <TabsTrigger value="cloud-deployment">Cloud Deployment</TabsTrigger>
            <TabsTrigger value="collaboration">Collaboration Tools</TabsTrigger>
            <TabsTrigger value="ai-models">Enhanced AI Models</TabsTrigger>
          </TabsList>

          {/* Data Sources Tab */}
          <TabsContent value="data-sources" className="space-y-6">
            <Alert variant="default" className="bg-primary/10 border-primary/20">
              <Database className="h-5 w-5" />
              <AlertTitle>Integrated Data Sources</AlertTitle>
              <AlertDescription>
                Connect to real geological data sources to power accurate mineral predictions
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DataSourceCard 
                title="Geological Surveys"
                description="Shapefiles containing geological maps, fault lines, and lithological information"
                status="Ready to connect"
                icon={<Layers className="h-5 w-5 text-primary" />}
                formats={["Shapefile", "GeoJSON", "GeoTIFF"]}
                source="Geological Survey Department"
              />
              
              <DataSourceCard 
                title="Satellite Imagery"
                description="Multispectral imagery for mineral signature detection and terrain analysis"
                status="Connected"
                icon={<Image className="h-5 w-5 text-primary" />}
                formats={["Landsat 8/9", "Sentinel-2", "WorldView-3"]}
                source="Remote Sensing Agency"
              />

              <DataSourceCard 
                title="LIDAR & Elevation Data"
                description="High-resolution digital elevation models for topographic analysis"
                status="Ready to connect"
                icon={<Layers className="h-5 w-5 text-primary" />}
                formats={["LAS", "DTM", "DEM"]}
                source="Aerial Survey Division"
              />
              
              <DataSourceCard 
                title="Geochemical Assays"
                description="Laboratory results from field samples providing ground truth data"
                status="Connected"
                icon={<Database className="h-5 w-5 text-primary" />}
                formats={["CSV", "Excel", "JSON"]}
                source="Mining Company Records"
              />
            </div>

            <div className="mt-6">
              <Button className="mr-2">Connect New Data Source</Button>
              <Button variant="outline">Manage Connections</Button>
            </div>
          </TabsContent>

          {/* Cloud Deployment Tab */}
          <TabsContent value="cloud-deployment" className="space-y-6">
            <Alert variant="default" className="bg-primary/10 border-primary/20">
              <CloudUpload className="h-5 w-5" />
              <AlertTitle>Cloud Infrastructure</AlertTitle>
              <AlertDescription>
                Deploy on scalable cloud platforms to handle large datasets and computation needs
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CloudServiceCard
                name="AWS"
                status="Configured"
                services={[
                  "S3 for geospatial data storage",
                  "EC2 for computational workloads",
                  "SageMaker for ML model training",
                  "Lambda for serverless processing"
                ]}
              />
              
              <CloudServiceCard
                name="Azure"
                status="Ready to deploy"
                services={[
                  "Azure Blob Storage for data",
                  "Azure Machine Learning",
                  "Azure Kubernetes Service",
                  "Azure Functions"
                ]}
              />
              
              <CloudServiceCard
                name="GCP"
                status="Not configured"
                services={[
                  "Google Cloud Storage",
                  "Vertex AI for ML workflows",
                  "BigQuery for analytics",
                  "Earth Engine for geospatial analysis"
                ]}
              />
            </div>

            <div className="p-4 border rounded-md bg-muted/50 mt-4">
              <h3 className="font-semibold mb-2">Deployment Architecture</h3>
              <ul className="space-y-1 list-disc pl-5">
                <li>Containerized microservices for data processing pipelines</li>
                <li>Kubernetes for orchestration and autoscaling</li>
                <li>Serverless functions for event-triggered workflows</li>
                <li>CDN for global delivery of visualization assets</li>
                <li>Database replication for high availability</li>
              </ul>
              <div className="mt-4">
                <Button>Deploy Infrastructure</Button>
              </div>
            </div>
          </TabsContent>

          {/* Collaboration Tools Tab */}
          <TabsContent value="collaboration" className="space-y-6">
            <Alert variant="default" className="bg-primary/10 border-primary/20">
              <Slack className="h-5 w-5" />
              <AlertTitle>Team Collaboration Integration</AlertTitle>
              <AlertDescription>
                Connect communication platforms to receive notifications and share insights
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CollaborationCard
                platform="Slack"
                status="Connected"
                icon={<Slack className="h-8 w-8" />}
                features={[
                  "Automated alerts for anomaly detection",
                  "Daily summaries of AI analysis results",
                  "Task notifications for field teams",
                  "Direct file sharing from the platform"
                ]}
              />
              
              <CollaborationCard
                platform="Microsoft Teams"
                status="Ready to connect"
                icon={<Teams className="h-8 w-8" />}
                features={[
                  "Meeting scheduling based on analysis results",
                  "Shared dashboards in Teams channels",
                  "Integration with Power BI reports",
                  "Video conferencing with data visualization"
                ]}
              />
            </div>
            
            <div className="p-4 border rounded-md bg-muted/50 mt-4">
              <h3 className="font-semibold mb-2">Notification Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Event Types</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-background">AI Analysis Complete</Badge>
                    <Badge variant="outline" className="bg-background">High-priority Anomalies</Badge>
                    <Badge variant="outline" className="bg-background">Task Assignments</Badge>
                    <Badge variant="outline" className="bg-background">Field Reports</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Recipients</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-background">Geologists</Badge>
                    <Badge variant="outline" className="bg-background">Drill Team</Badge>
                    <Badge variant="outline" className="bg-background">Administrators</Badge>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button>Configure Notifications</Button>
              </div>
            </div>
          </TabsContent>

          {/* Enhanced AI Models Tab */}
          <TabsContent value="ai-models" className="space-y-6">
            <Alert variant="default" className="bg-primary/10 border-primary/20">
              <Database className="h-5 w-5" />
              <AlertTitle>Advanced AI Model Integration</AlertTitle>
              <AlertDescription>
                Leverage sophisticated deep learning models for improved geological predictions
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AIModelCard
                name="SatelliteVision CNN"
                type="Convolutional Neural Network"
                status="Production Ready"
                description="Deep learning model specialized in identifying mineral signatures from multispectral satellite imagery"
                metrics={{
                  accuracy: 93.5,
                  latency: 1.2,
                  lastTrained: "2024-04-15"
                }}
                features={[
                  "Detects subtle spectral anomalies",
                  "Works with Landsat and Sentinel-2 data",
                  "Transfer learning from pre-trained models",
                  "Attention mechanisms for feature importance"
                ]}
              />
              
              <AIModelCard
                name="GeoStructure-3D"
                type="3D Graph Convolutional Network"
                status="In Development"
                description="Advanced network for modeling 3D geological structures from drill core and seismic data"
                metrics={{
                  accuracy: 87.2,
                  latency: 2.8,
                  lastTrained: "2024-03-20"
                }}
                features={[
                  "Creates 3D subsurface mineralization models",
                  "Integrates drill hole data with geophysics",
                  "Uncertainty quantification",
                  "API for real-time inference"
                ]}
              />
              
              <AIModelCard
                name="MineralEnsemble"
                type="Ensemble Learning System"
                status="Deployed"
                description="Hybrid model combining random forests, gradient boosting, and neural networks"
                metrics={{
                  accuracy: 91.8,
                  latency: 0.8,
                  lastTrained: "2024-04-10"
                }}
                features={[
                  "Combines multiple model predictions",
                  "Handles missing data gracefully",
                  "Provides confidence intervals",
                  "Interpretable feature importance"
                ]}
              />
              
              <AIModelCard
                name="GeoTransformer"
                type="Transformer Neural Network"
                status="Research"
                description="Attention-based model for correlating multi-modal geological data across regions"
                metrics={{
                  accuracy: 89.4,
                  latency: 3.5,
                  lastTrained: "2024-03-05"
                }}
                features={[
                  "Long-range spatial dependencies",
                  "Multi-headed attention for data fusion",
                  "Self-supervised pre-training",
                  "Zero-shot transfer to new regions"
                ]}
              />
            </div>

            <div className="mt-6">
              <Button className="mr-2">Deploy New Model</Button>
              <Button variant="outline">Retrain Models</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Component for data source cards
const DataSourceCard: React.FC<{
  title: string;
  description: string;
  status: string;
  icon: React.ReactNode;
  formats: string[];
  source: string;
}> = ({ title, description, status, icon, formats, source }) => {
  const isConnected = status.toLowerCase().includes('connected');
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle>{title}</CardTitle>
          </div>
          <Badge variant={isConnected ? "default" : "outline"}>
            {status}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <p className="text-sm font-medium">Supported Formats:</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {formats.map((format, index) => (
              <Badge key={index} variant="outline" className="bg-muted/50">
                {format}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mt-3 text-sm text-muted-foreground">
          <p>Source: {source}</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for cloud service cards
const CloudServiceCard: React.FC<{
  name: string;
  status: string;
  services: string[];
}> = ({ name, status, services }) => {
  const isConfigured = status.toLowerCase().includes('configured');
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle>{name}</CardTitle>
          <Badge variant={isConfigured ? "default" : "outline"}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="text-sm space-y-1">
          {services.map((service, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{service}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Button size="sm" variant={isConfigured ? "outline" : "default"}>
            {isConfigured ? 'Manage' : 'Configure'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for collaboration platform cards
const CollaborationCard: React.FC<{
  platform: string;
  status: string;
  icon: React.ReactNode;
  features: string[];
}> = ({ platform, status, icon, features }) => {
  const isConnected = status.toLowerCase().includes('connected');
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle>{platform}</CardTitle>
          </div>
          <Badge variant={isConnected ? "default" : "outline"}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="text-sm space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Button size="sm" variant={isConnected ? "outline" : "default"}>
            {isConnected ? 'Configure Webhooks' : 'Connect'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for AI model cards
const AIModelCard: React.FC<{
  name: string;
  type: string;
  status: string;
  description: string;
  metrics: {
    accuracy: number;
    latency: number;
    lastTrained: string;
  };
  features: string[];
}> = ({ name, type, status, description, metrics, features }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'production ready':
      case 'deployed':
        return 'bg-green-500 text-white';
      case 'in development':
        return 'bg-blue-500 text-white';
      case 'research':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-muted text-foreground';
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{type}</CardDescription>
          </div>
          <Badge className={getStatusColor(status)}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-2">{description}</p>
        
        <div className="grid grid-cols-3 gap-2 my-3">
          <div className="text-center p-2 bg-muted/30 rounded-md">
            <p className="text-xs text-muted-foreground">Accuracy</p>
            <p className="font-medium">{metrics.accuracy}%</p>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded-md">
            <p className="text-xs text-muted-foreground">Latency</p>
            <p className="font-medium">{metrics.latency}s</p>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded-md">
            <p className="text-xs text-muted-foreground">Last Trained</p>
            <p className="text-xs font-medium">{metrics.lastTrained}</p>
          </div>
        </div>
        
        <div className="mt-2">
          <p className="text-xs font-medium mb-1">Key Features:</p>
          <ul className="text-xs space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataIntegration;
