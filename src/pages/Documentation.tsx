import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, Globe, Database, Brain, Map, BarChart4, Users, Layers, Search, Navigation, MapPin, Slack } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 px-4">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">GeoVision AI Miner Documentation</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Comprehensive guide to using the GeoVision AI Miner platform for geological exploration and analysis.
          </p>
        </div>
        
        <Tabs defaultValue="modules" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="modules">Modules & Features</TabsTrigger>
            <TabsTrigger value="user-guide">User Guide</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          {/* Modules & Features Tab */}
          <TabsContent value="modules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Modules</CardTitle>
                <CardDescription>
                  Learn about each module within GeoVision AI Miner and how they can enhance your geological exploration process.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ModuleCard 
                    icon={<Map className="h-8 w-8 text-geo-blue" />}
                    title="Interactive Map"
                    description="The central visualization component for geological data exploration."
                    link="/interactive-map"
                  />
                  <ModuleCard 
                    icon={<Brain className="h-8 w-8 text-geo-blue" />}
                    title="AI Analysis"
                    description="Advanced machine learning algorithms to identify mineral deposits and geological anomalies."
                  />
                  <ModuleCard 
                    icon={<Database className="h-8 w-8 text-geo-blue" />}
                    title="Data Integration"
                    description="Tools for importing, managing, and integrating diverse geological datasets."
                  />
                  <ModuleCard 
                    icon={<BarChart4 className="h-8 w-8 text-geo-blue" />}
                    title="Results Visualization"
                    description="Visual representation of analysis results with heatmaps and anomaly detection."
                  />
                  <ModuleCard 
                    icon={<Users className="h-8 w-8 text-geo-blue" />}
                    title="Collaboration Tools"
                    description="Enhanced team coordination with role-based access and communication features."
                  />
                  <ModuleCard 
                    icon={<Shield className="h-8 w-8 text-geo-blue" />}
                    title="Security & Compliance"
                    description="Enterprise-grade security and industry standards compliance."
                  />
                </div>

                <ScrollArea className="h-[500px] pr-4 mt-8">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="map">
                      <AccordionTrigger className="text-lg font-medium">
                        Interactive Map Module
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-4">
                        <h4 className="font-medium text-foreground">Overview</h4>
                        <p>
                          The Interactive Map module serves as the central visualization component of the GeoVision AI Miner platform, 
                          allowing users to view, manipulate, and analyze geological data in a spatial context.
                        </p>
                        
                        <div className="my-4 flex justify-center">
                          <Button asChild variant="outline">
                            <Link to="/interactive-map" className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4" />
                              Try Interactive Map
                            </Link>
                          </Button>
                        </div>
                        
                        <h4 className="font-medium text-foreground">Key Features</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Multiple layer support with adjustable opacity settings</li>
                          <li>Support for various data types (raster, vector, point, heatmap)</li>
                          <li>Interactive zooming, panning, and 3D terrain visualization</li>
                          <li>Location search functionality and navigation to key regions</li>
                          <li>Geological marker display with detailed information</li>
                          <li>Satellite imagery and terrain visualization</li>
                          <li>Custom layer import and management</li>
                        </ul>
                        
                        <h4 className="font-medium text-foreground">User Benefits</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Visualize complex geological data in an intuitive spatial interface</li>
                          <li>Overlay multiple data sources to identify correlations and patterns</li>
                          <li>Navigate to regions of interest with predefined locations</li>
                          <li>View potential mineral deposits with interactive markers</li>
                          <li>Toggle between different visualization layers for comprehensive analysis</li>
                          <li>Seamless integration with other modules like AI Analysis and Results Visualization</li>
                          <li>Export map views for reports and presentations</li>
                        </ul>
                        
                        <h4 className="font-medium text-foreground">How to Use</h4>
                        <ol className="list-decimal pl-6 space-y-1">
                          <li>Enter your Mapbox API key to initialize the map (get a free key at mapbox.com)</li>
                          <li>Use the layers tab to toggle visibility and adjust opacity of different data layers</li>
                          <li>Navigate to regions of interest using the locations tab</li>
                          <li>Click on markers to view detailed information about geological points of interest</li>
                          <li>Use map controls for zooming, panning, and enabling fullscreen mode</li>
                          <li>Toggle 3D terrain for enhanced topographical visualization</li>
                        </ol>
                        
                        <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                          <Navigation className="h-4 w-4" />
                          <AlertTitle>Pro Tip</AlertTitle>
                          <AlertDescription>
                            Use the layer opacity controls to overlay satellite imagery with terrain data for a better understanding 
                            of how geological features relate to the physical landscape.
                          </AlertDescription>
                        </Alert>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="ai-analysis">
                      <AccordionTrigger className="text-lg font-medium">
                        AI Analysis Module
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-4">
                        <h4 className="font-medium text-foreground">Overview</h4>
                        <p>
                          The AI Analysis module leverages advanced machine learning algorithms to analyze geological data 
                          and identify potential mineral deposits, anomalies, and patterns that might be missed by traditional methods.
                        </p>
                        
                        <h4 className="font-medium text-foreground">Key Features</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Multiple AI models specialized for different mineral types</li>
                          <li>Configurable analysis parameters and confidence thresholds</li>
                          <li>Batch processing capabilities for large datasets</li>
                          <li>Integration with historical drilling results for model training</li>
                          <li>Progressive learning that improves with each analysis</li>
                        </ul>
                        
                        <h4 className="font-medium text-foreground">User Benefits</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Discover potential deposits that conventional methods might miss</li>
                          <li>Reduce exploration costs by prioritizing high-potential areas</li>
                          <li>Gain confidence scores for predictions to assist decision-making</li>
                          <li>Improve accuracy over time as the system learns from your data</li>
                          <li>Generate detailed reports for stakeholder presentations</li>
                        </ul>
                        
                        <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                          <Brain className="h-4 w-4" />
                          <AlertTitle>Pro Tip</AlertTitle>
                          <AlertDescription>
                            For best results, start with a focused area and gradually expand your analysis as the AI model 
                            learns the specific geological characteristics of your region.
                          </AlertDescription>
                        </Alert>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="data-integration">
                      <AccordionTrigger className="text-lg font-medium">
                        Data Integration Module
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-4">
                        <h4 className="font-medium text-foreground">Overview</h4>
                        <p>
                          The Data Integration module allows users to import, manage, and unify data from various sources, 
                          creating a comprehensive geological database that serves as the foundation for all analyses.
                        </p>
                        
                        <h4 className="font-medium text-foreground">Key Features</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Support for multiple data formats (GeoJSON, Shapefile, CSV, etc.)</li>
                          <li>Automated validation and quality control</li>
                          <li>Data transformation and normalization tools</li>
                          <li>Integration with external data sources and APIs</li>
                          <li>Versioning system for tracking data changes</li>
                        </ul>
                        
                        <h4 className="font-medium text-foreground">User Benefits</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Centralize all your geological data in one platform</li>
                          <li>Ensure data consistency and quality across projects</li>
                          <li>Save time with automated data processing workflows</li>
                          <li>Access historical data alongside new acquisitions</li>
                          <li>Create a single source of truth for your exploration team</li>
                        </ul>
                        
                        <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                          <Database className="h-4 w-4" />
                          <AlertTitle>Pro Tip</AlertTitle>
                          <AlertDescription>
                            Use the data validation tools before running AI analyses to ensure your results 
                            aren't compromised by data quality issues or inconsistencies.
                          </AlertDescription>
                        </Alert>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="results-visualization">
                      <AccordionTrigger className="text-lg font-medium">
                        Results Visualization Module
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-4">
                        <h4 className="font-medium text-foreground">Overview</h4>
                        <p>
                          The Results Visualization module transforms complex analytical outputs into intuitive 
                          visual representations, making it easier to interpret findings and communicate results to stakeholders.
                        </p>
                        
                        <h4 className="font-medium text-foreground">Key Features</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Interactive heatmaps showing probability distributions</li>
                          <li>Anomaly detection with confidence scoring</li>
                          <li>3D visualization capabilities for subsurface data</li>
                          <li>Time-series analysis for monitoring changes</li>
                          <li>Export options for reports and presentations</li>
                        </ul>
                        
                        <h4 className="font-medium text-foreground">User Benefits</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Transform complex data into clear visual insights</li>
                          <li>Quickly identify high-potential exploration targets</li>
                          <li>Create compelling visualizations for stakeholder presentations</li>
                          <li>Compare results across different analyses and time periods</li>
                          <li>Make informed decisions based on clear visual evidence</li>
                        </ul>
                        
                        <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                          <BarChart4 className="h-4 w-4" />
                          <AlertTitle>Pro Tip</AlertTitle>
                          <AlertDescription>
                            Use the anomaly detection tab to quickly identify and prioritize areas that show unusual 
                            patterns compared to surrounding regions, often indicators of resource potential.
                          </AlertDescription>
                        </Alert>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="collaboration">
                      <AccordionTrigger className="text-lg font-medium">
                        Collaboration Tools
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-4">
                        <h4 className="font-medium text-foreground">Overview</h4>
                        <p>
                          The Collaboration Tools module enables seamless teamwork across disciplines and organizations, 
                          with role-based access control and communication features designed for geological exploration teams.
                        </p>
                        
                        <h4 className="font-medium text-foreground">Key Features</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Role-based access control for different team members</li>
                          <li>Real-time communication and notification system</li>
                          <li>Project management tools with task assignment</li>
                          <li>Annotation and commenting on maps and results</li>
                          <li>Audit trails for regulatory compliance</li>
                        </ul>
                        
                        <h4 className="font-medium text-foreground">User Benefits</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Improve team coordination across different disciplines</li>
                          <li>Maintain security with granular permission controls</li>
                          <li>Reduce miscommunication with centralized project information</li>
                          <li>Track project progress and team member contributions</li>
                          <li>Facilitate knowledge sharing across your organization</li>
                        </ul>
                        
                        <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                          <Users className="h-4 w-4" />
                          <AlertTitle>Pro Tip</AlertTitle>
                          <AlertDescription>
                            Use the role selector to quickly switch between different role views and understand 
                            how team members with different specializations interact with the platform.
                          </AlertDescription>
                        </Alert>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="security">
                      <AccordionTrigger className="text-lg font-medium">
                        Security & Compliance
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-4">
                        <h4 className="font-medium text-foreground">Overview</h4>
                        <p>
                          The Security & Compliance module ensures that all data and analyses meet industry standards 
                          and regulations, with enterprise-grade security features to protect sensitive exploration data.
                        </p>
                        
                        <h4 className="font-medium text-foreground">Key Features</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>End-to-end encryption for all data</li>
                          <li>Compliance with JORC, NI 43-101, SAMREC, and UNFC standards</li>
                          <li>Detailed audit logs for all platform activities</li>
                          <li>Multi-factor authentication options</li>
                          <li>Regular security updates and vulnerability assessments</li>
                        </ul>
                        
                        <h4 className="font-medium text-foreground">User Benefits</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Protect valuable exploration data from unauthorized access</li>
                          <li>Ensure regulatory compliance for public reporting</li>
                          <li>Maintain investor confidence with secure data handling</li>
                          <li>Prevent data loss with comprehensive backup systems</li>
                          <li>Demonstrate due diligence in data security practices</li>
                        </ul>
                        
                        <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                          <Shield className="h-4 w-4" />
                          <AlertTitle>Pro Tip</AlertTitle>
                          <AlertDescription>
                            Review the security settings periodically and ensure that access permissions 
                            are updated when team members change roles or leave the organization.
                          </AlertDescription>
                        </Alert>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </ScrollArea>
              </CardContent>
            </Card>
          
          {/* Add Slack Integration Documentation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Slack className="h-5 w-5" />
                Slack Integration
              </CardTitle>
              <CardDescription>
                Learn how to connect the platform with Slack to enhance team collaboration and receive real-time notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="slack-setup">
                    <AccordionTrigger className="text-lg font-medium">
                      Setting Up Slack Integration
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-4">
                      <h4 className="font-medium text-foreground">Creating a Slack App and Webhook</h4>
                      <ol className="list-decimal pl-6 space-y-3">
                        <li>
                          <strong>Create a Slack App:</strong>
                          <ul className="list-disc pl-6 mt-1">
                            <li>Go to <a href="https://api.slack.com/apps" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://api.slack.com/apps</a> and click "Create New App"</li>
                            <li>Choose "From scratch" and provide a name and workspace</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Enable Incoming Webhooks:</strong>
                          <ul className="list-disc pl-6 mt-1">
                            <li>In your Slack App settings, navigate to "Incoming Webhooks"</li>
                            <li>Toggle "Activate Incoming Webhooks" to On</li>
                            <li>Click "Add New Webhook to Workspace"</li>
                            <li>Select the channel where messages will be posted by default</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Copy the Webhook URL:</strong>
                          <ul className="list-disc pl-6 mt-1">
                            <li>After authorizing, you'll see a Webhook URL generated</li>
                            <li>Copy this URL to use in the platform's Slack integration settings</li>
                          </ul>
                        </li>
                      </ol>
                      
                      <div className="my-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-blue-800 font-medium">Security Note:</p>
                        <p className="text-blue-700">Webhook URLs are sensitive credentials. Never share them publicly or commit them to version control systems.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="platform-config">
                    <AccordionTrigger className="text-lg font-medium">
                      Platform Configuration
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-4">
                      <h4 className="font-medium text-foreground">Configuring Slack in the Platform</h4>
                      <ol className="list-decimal pl-6 space-y-3">
                        <li>
                          <strong>Access Slack Settings:</strong>
                          <ul className="list-disc pl-6 mt-1">
                            <li>Navigate to Settings → Integrations → Slack</li>
                            <li>Enter your Slack Webhook URL in the designated field</li>
                            <li>Toggle "Enable Slack Integration" to activate the feature</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Test the Connection:</strong>
                          <ul className="list-disc pl-6 mt-1">
                            <li>Click the "Test Connection" button to verify your setup</li>
                            <li>Check your Slack channel for a test message</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Configure Notification Preferences:</strong>
                          <ul className="list-disc pl-6 mt-1">
                            <li>Select which notification types to send to Slack</li>
                            <li>Customize which Slack channels receive specific notification types</li>
                            <li>Send test notifications to verify each notification type</li>
                          </ul>
                        </li>
                      </ol>
                      
                      <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                        <Slack className="h-4 w-4" />
                        <AlertTitle>Pro Tip</AlertTitle>
                        <AlertDescription>
                          For larger teams, consider creating separate Slack channels for different notification types (e.g., anomaly-alerts, daily-summaries) to keep communications organized and reduce noise in general channels.
                        </AlertDescription>
                      </Alert>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="notification-types">
                    <AccordionTrigger className="text-lg font-medium">
                      Available Notification Types
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-4">
                      <h4 className="font-medium text-foreground">Automated Notifications</h4>
                      <ul className="list-disc pl-6 space-y-3">
                        <li>
                          <strong>Anomaly Detection Alerts:</strong>
                          <p className="mt-1">Real-time notifications when the AI system detects geological anomalies that may indicate mineral deposits.</p>
                        </li>
                        <li>
                          <strong>Daily AI Analysis Summaries:</strong>
                          <p className="mt-1">Scheduled daily reports containing analysis results, insights, and predictions from the platform's AI systems.</p>
                        </li>
                        <li>
                          <strong>Task Notifications:</strong>
                          <p className="mt-1">Updates for field teams about new assignments, priority changes, and task status updates.</p>
                        </li>
                        <li>
                          <strong>File Sharing:</strong>
                          <p className="mt-1">Share analysis reports, geological maps, and other documents directly to Slack channels.</p>
                        </li>
                      </ul>
                      
                      <div className="my-4">
                        <h4 className="font-medium text-foreground">Message Formatting</h4>
                        <p>All messages include structured data with:</p>
                        <ul className="list-disc pl-6 mt-1">
                          <li>Clear visual indicators and emojis to distinguish message types</li>
                          <li>Confidence scores for AI-generated insights</li>
                          <li>Timestamps and location data where applicable</li>
                          <li>Links back to the platform for detailed viewing</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="troubleshooting">
                    <AccordionTrigger className="text-lg font-medium">
                      Troubleshooting
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-4">
                      <h4 className="font-medium text-foreground">Common Issues</h4>
                      <ul className="list-disc pl-6 space-y-3">
                        <li>
                          <strong>Messages not appearing in Slack:</strong>
                          <ul className="list-disc pl-6 mt-1">
                            <li>Verify that the Slack integration is enabled in platform settings</li>
                            <li>Ensure the webhook URL is entered correctly</li>
                            <li>Check that the Slack app is still authorized in your workspace</li>
                            <li>Confirm the target channel exists and the webhook has permission to post there</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Incorrect channel for notifications:</strong>
                          <ul className="list-disc pl-6 mt-1">
                            <li>Review notification preferences to verify channel assignments</li>
                            <li>Make sure channel names are entered correctly (without the # symbol)</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Rate limiting errors:</strong>
                          <ul className="list-disc pl-6 mt-1">
                            <li>Slack limits incoming webhooks to one message per second</li>
                            <li>For high-volume notifications, consider creating multiple webhook URLs</li>
                          </ul>
                        </li>
                      </ul>
                      
                      <Alert className="bg-amber-50 border-amber-200 text-amber-800">
                        <AlertTitle>Note</AlertTitle>
                        <AlertDescription>
                          If changes to your Slack workspace occur (such as channel renames or deletions), 
                          you may need to update your integration settings in the platform accordingly.
                        </AlertDescription>
                      </Alert>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ScrollArea>
            </CardContent>
          </Card>
          
          
        </TabsContent>
        
          {/* User Guide Tab */}
          <TabsContent value="user-guide" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  Learn how to set up your account and navigate the GeoVision AI Miner platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="account-setup">
                    <AccordionTrigger>Account Setup</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <p>Setting up your GeoVision AI Miner account is simple:</p>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Navigate to the Sign Up page and create your account</li>
                        <li>Verify your email address through the confirmation link</li>
                        <li>Complete your profile with your professional information</li>
                        <li>Select your role to customize your dashboard experience</li>
                        <li>Connect any team members who will be collaborating on projects</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="navigation">
                    <AccordionTrigger>Platform Navigation</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <p>The GeoVision AI Miner platform is organized into several key areas:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li><strong>Dashboard:</strong> Your personalized overview of projects and recent activities</li>
                        <li><strong>Projects:</strong> Create and manage your exploration projects</li>
                        <li><strong>Data:</strong> Upload, manage, and integrate geological datasets</li>
                        <li><strong>Analysis:</strong> Run AI analyses and view results</li>
                        <li><strong>Reports:</strong> Generate and export comprehensive reports</li>
                        <li><strong>Settings:</strong> Configure your account and security preferences</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="first-project">
                    <AccordionTrigger>Creating Your First Project</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <p>Follow these steps to create your first exploration project:</p>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Click "New Project" from your dashboard</li>
                        <li>Define the project area by uploading boundaries or using the map interface</li>
                        <li>Add basic project information including location, target minerals, and team members</li>
                        <li>Upload initial datasets or connect to external data sources</li>
                        <li>Configure project settings including default map layers and analysis parameters</li>
                        <li>Save and launch your project to begin exploration</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="data-upload">
                    <AccordionTrigger>Uploading and Managing Data</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <p>The platform supports multiple ways to add data to your projects:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li><strong>Direct Upload:</strong> Upload files directly from your computer</li>
                        <li><strong>API Connection:</strong> Connect to external data sources via API</li>
                        <li><strong>Public Datasets:</strong> Access curated public geological datasets</li>
                        <li><strong>Sensor Integration:</strong> Connect with field sensors for real-time data</li>
                        <li><strong>Batch Import:</strong> Import multiple datasets simultaneously</li>
                      </ul>
                      <p className="mt-2">Supported file formats include GeoJSON, Shapefile, CSV, GeoTIFF, and more.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Advanced Features</CardTitle>
                <CardDescription>
                  Detailed guidance on using the platform's advanced capabilities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  More detailed documentation for advanced features is available in our comprehensive user manual.
                  Contact your account manager for access to specialized training resources.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Answers to common questions about using GeoVision AI Miner.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>What types of mineral deposits can GeoVision AI Miner detect?</AccordionTrigger>
                    <AccordionContent>
                      GeoVision AI Miner is trained on diverse geological datasets and can detect patterns associated with various mineral deposits including copper, gold, iron, cobalt, zinc, lithium, rare earth elements, and more. The platform is regularly updated with new models for additional mineral types based on the latest research and user feedback.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-2">
                    <AccordionTrigger>How accurate are the AI predictions?</AccordionTrigger>
                    <AccordionContent>
                      Prediction accuracy varies depending on data quality, geological complexity, and the mineral type being analyzed. In validation studies, our AI models have achieved 70-85% accuracy in identifying areas with high mineral potential. Each prediction includes a confidence score to help users gauge reliability. The system improves over time as it learns from new data and verified results.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-3">
                    <AccordionTrigger>Can I import my existing geological datasets?</AccordionTrigger>
                    <AccordionContent>
                      Yes, GeoVision AI Miner supports importing a wide range of geological data formats including GeoJSON, Shapefile, CSV with coordinates, GeoTIFF, and various industry-specific formats. The platform includes tools for data cleaning, transformation, and validation to ensure compatibility with our analysis systems.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-4">
                    <AccordionTrigger>How is data security handled?</AccordionTrigger>
                    <AccordionContent>
                      We implement enterprise-grade security measures including end-to-end encryption, secure access controls, and regular security audits. All data is stored in compliance with industry standards, and users have complete control over data sharing permissions. Our platform meets requirements for publicly listed mining companies and includes features to support regulatory compliance.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-5">
                    <AccordionTrigger>What subscription plans are available?</AccordionTrigger>
                    <AccordionContent>
                      GeoVision AI Miner offers flexible subscription plans tailored to different organization sizes and needs, from small exploration companies to major mining corporations. Plans include varying levels of data storage, analysis capacity, and user seats. Contact our sales team for detailed pricing information and to discuss which plan best fits your requirements.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        
      </div>
    </div>
  );
};

// Helper Component for Module Cards
const ModuleCard: React.FC<{ 
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}> = ({ icon, title, description, link }) => {
  const cardContent = (
    <Card className="overflow-hidden border-2 h-full">
      <CardHeader className="bg-slate-50 p-4 flex flex-row items-center space-y-0 gap-3">
        <div className="bg-white p-2 rounded-md border">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  return link ? (
    <Link to={link} className="block h-full hover:no-underline">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

export default Documentation;
