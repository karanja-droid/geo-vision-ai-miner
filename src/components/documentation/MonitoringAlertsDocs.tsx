
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Shield, Activity, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MonitoringAlertsDocs: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-primary" />
            Monitoring & Alerts Documentation
          </CardTitle>
          <CardDescription>
            Learn how to set up real-time monitoring and alerts to catch errors and performance issues as they occur.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Beta Feature:</strong> The monitoring system is currently in beta. Your feedback helps us improve it!
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="setup">Setup Guide</TabsTrigger>
              <TabsTrigger value="error">Error Monitoring</TabsTrigger>
              <TabsTrigger value="performance">Performance Monitoring</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 pt-4">
              <h3 className="text-lg font-medium">Real-time Monitoring System</h3>
              <p>The GeoVision AI Miner platform includes a comprehensive monitoring and alerting system to help you:</p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Detect and respond to errors before they affect your users</li>
                <li>Monitor performance degradation across frontend and backend services</li>
                <li>Track API health and integration stability</li>
                <li>Receive timely notifications through Slack</li>
              </ul>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                    <h4 className="font-medium">Error Monitoring</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Captures JavaScript exceptions, API errors, and backend failures.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Activity className="h-5 w-5 text-blue-500 mr-2" />
                    <h4 className="font-medium">Performance Tracking</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Monitors page load times, API response times, and resource usage.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    <h4 className="font-medium">System Health</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Tracks overall system health and availability metrics.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="setup" className="space-y-4 pt-4">
              <h3 className="text-lg font-medium">Setting Up Monitoring</h3>
              
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Connect Slack Integration:</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    First, set up your Slack integration with a valid webhook URL in the Connection Settings tab.
                  </p>
                </li>
                
                <li>
                  <strong>Configure Monitoring Settings:</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Navigate to the "Monitoring & Alerts" tab in the Slack Integration panel to enable specific monitoring types.
                  </p>
                </li>
                
                <li>
                  <strong>Set Alert Thresholds:</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Define error and performance thresholds that determine when alerts are triggered.
                  </p>
                </li>
                
                <li>
                  <strong>Choose Alert Channel:</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Specify which Slack channel should receive the monitoring alerts.
                  </p>
                </li>
                
                <li>
                  <strong>Select Alert Frequency:</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Choose between immediate alerts, hourly digests, or daily summaries.
                  </p>
                </li>
                
                <li>
                  <strong>Test Configuration:</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Use the "Test Error Alert" button to verify your configuration works correctly.
                  </p>
                </li>
              </ol>
              
              <div className="bg-muted p-4 rounded-md mt-4">
                <h4 className="font-medium mb-2">Beta Limitations</h4>
                <p className="text-sm">
                  During the beta phase, some advanced monitoring features may have limitations:
                </p>
                <ul className="list-disc pl-6 mt-2 text-sm">
                  <li>API monitoring is limited to specific endpoints</li>
                  <li>Custom alert rules are not yet available</li>
                  <li>Historical data retention is limited to 7 days</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="error" className="space-y-4 pt-4">
              <h3 className="text-lg font-medium">Error Monitoring Details</h3>
              
              <p>
                The error monitoring system captures exceptions and errors across your application stack:
              </p>
              
              <div className="space-y-4 mt-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-1">Frontend Error Tracking</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically captures uncaught JavaScript exceptions, React errors, and network failures.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-1">Backend Error Logging</h4>
                  <p className="text-sm text-muted-foreground">
                    Monitors server-side errors in your API endpoints and database operations.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-1">Integration Errors</h4>
                  <p className="text-sm text-muted-foreground">
                    Tracks failures in third-party service integrations and external APIs.
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Error Alert Format</h4>
                <p className="text-sm mb-2">
                  Error alerts include contextual information to help with debugging:
                </p>
                <ul className="list-disc pl-6 text-sm">
                  <li>Error type and message</li>
                  <li>Stack trace when available</li>
                  <li>User context (anonymous ID, session information)</li>
                  <li>Environment details (browser, OS, app version)</li>
                  <li>Timestamp and frequency</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4 pt-4">
              <h3 className="text-lg font-medium">Performance Monitoring Details</h3>
              
              <p>
                Performance monitoring helps identify bottlenecks and slow operations across your application:
              </p>
              
              <div className="space-y-4 mt-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-1">Page Load Performance</h4>
                  <p className="text-sm text-muted-foreground">
                    Tracks page load times, time to interactive, and other key web vitals metrics.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-1">API Response Times</h4>
                  <p className="text-sm text-muted-foreground">
                    Monitors how long your API endpoints and external services take to respond.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-1">Resource Utilization</h4>
                  <p className="text-sm text-muted-foreground">
                    Tracks memory usage, CPU load, and other system resource metrics.
                  </p>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-md mt-4">
                <h4 className="font-medium mb-2">Setting Appropriate Thresholds</h4>
                <p className="text-sm">
                  When configuring performance thresholds, consider these guidelines:
                </p>
                <ul className="list-disc pl-6 mt-2 text-sm">
                  <li>API responses: 1000ms is typically a good baseline threshold</li>
                  <li>Page loads: 3000ms for standard pages</li>
                  <li>Data processing: Threshold depends on data volume and complexity</li>
                </ul>
                <p className="text-sm mt-2">
                  Adjust these thresholds based on your specific application requirements and user expectations.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringAlertsDocs;
