
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
      
      <Card className="mt-6">
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
    </>
  );
};

export default UserGuideTabs;
