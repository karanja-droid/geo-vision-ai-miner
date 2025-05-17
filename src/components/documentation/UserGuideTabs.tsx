
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const UserGuideTabs: React.FC = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Learn how to set up your account and navigate the GeoVision AI Miner platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Beta Version Notice:</strong> This documentation covers the beta version of GeoVision AI Miner, which includes new monitoring features and enhanced visualizations.
            </AlertDescription>
          </Alert>

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
                  <li><strong>Beta Users:</strong> Make sure to complete the beta user survey to unlock all beta features</li>
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
                  <li><strong>Monitoring:</strong> <span className="text-blue-600 font-medium">New in Beta!</span> Set up and review system monitoring</li>
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
                  <li>Set up monitoring alerts for critical operations <span className="text-blue-600 font-medium">(Beta Feature)</span></li>
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
                
                <div className="bg-blue-50 p-3 rounded-md text-blue-800 text-sm mt-3">
                  <strong>Beta Feature:</strong> Enhanced GIS Shapefile processing with AI-powered anomaly detection is now available. See the GIS Shapefiles section for details.
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="monitoring-setup">
              <AccordionTrigger>Setting Up Monitoring</AccordionTrigger>
              <AccordionContent className="space-y-2">
                <p className="flex items-center"><span className="inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-medium mr-2 px-2 py-0.5 text-xs">Beta</span> Monitor your system's health and receive alerts about critical issues:</p>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Navigate to the Slack Integration panel</li>
                  <li>Set up your Slack connection in the Connection Settings tab</li>
                  <li>Go to the Monitoring & Alerts tab</li>
                  <li>Enable the types of monitoring you need (error, performance, API)</li>
                  <li>Set appropriate thresholds for when alerts should trigger</li>
                  <li>Specify which Slack channel should receive alerts</li>
                  <li>Choose how frequently alerts should be sent</li>
                  <li>Test your configuration with the "Test Error Alert" button</li>
                </ol>
                <p className="mt-2 text-sm text-muted-foreground">
                  Monitoring data is available for 7 days during the beta period and will be extended in the full release.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Beta Features</CardTitle>
          <CardDescription>
            Explore the new capabilities available in the beta version.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium">Real-time System Monitoring</h3>
              <p className="text-muted-foreground mb-2">
                Configure alerts to be notified of errors, performance issues, and API health problems as they occur.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Error monitoring with custom thresholds</li>
                <li>Performance tracking for slow operations</li>
                <li>API health monitoring for external services</li>
                <li>Slack integration for real-time notifications</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium">Enhanced GIS Shapefile Analysis</h3>
              <p className="text-muted-foreground mb-2">
                New advanced analysis tools for GIS shapefiles with improved visualization options.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>AI-powered anomaly detection in geological data</li>
                <li>3D visualization of underground structures</li>
                <li>Improved report generation with customizable templates</li>
                <li>Batch processing for large shapefile collections</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium">Improved Satellite Vision CNN</h3>
              <p className="text-muted-foreground mb-2">
                Enhanced satellite imagery analysis with our new convolutional neural networks.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Higher accuracy mineral detection algorithms</li>
                <li>Better performance on low-resolution imagery</li>
                <li>Extended mineral type recognition</li>
                <li>Anomaly confidence scoring system</li>
              </ul>
            </div>
            
            <p className="text-muted-foreground mt-4">
              We appreciate your feedback on these beta features. Use the feedback button in the bottom right corner to share your thoughts and report any issues.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default UserGuideTabs;
