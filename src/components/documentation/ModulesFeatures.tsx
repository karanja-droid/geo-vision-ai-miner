
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Map, Brain, Database, BarChart4, Users, Shield, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ModuleCard from './ModuleCard';

const ModulesFeatures: React.FC = () => {
  return (
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
                      <Map className="mr-2 h-4 w-4" />
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
  );
};

export default ModulesFeatures;
