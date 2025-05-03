
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slack } from 'lucide-react';

const SlackIntegrationDocs: React.FC = () => {
  return (
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
  );
};

export default SlackIntegrationDocs;
