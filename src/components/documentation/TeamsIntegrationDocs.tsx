
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Steps, StepItem } from '@/components/ui/steps';
import { MessageSquare } from 'lucide-react';

const TeamsIntegrationDocs: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-blue-500" />
          <CardTitle>Microsoft Teams Integration</CardTitle>
        </div>
        <CardDescription>
          Connect GeoVision AI Miner with Microsoft Teams to streamline team communication and collaboration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <h3 className="font-medium text-lg mb-3">Setting Up Microsoft Teams Integration</h3>
          <Steps>
            <StepItem step={1} title="Create Incoming Webhook in Teams">
              <p>Open Microsoft Teams and navigate to the channel where you want to receive notifications.</p>
              <p>Click the three dots menu (...) next to the channel name and select "Connectors".</p>
              <p>Search for "Incoming Webhook" and click "Add".</p>
              <p>Configure the webhook with a name and optional icon, then click "Create".</p>
              <p>Copy the webhook URL that is generated - you'll need this for the next step.</p>
            </StepItem>
            
            <StepItem step={2} title="Configure in GeoVision AI Miner">
              <p>Navigate to "Data Integration" page in GeoVision AI Miner.</p>
              <p>Select the "Integrations" tab and click on "Microsoft Teams" tab.</p>
              <p>Paste your webhook URL into the "Incoming Webhook URL" field.</p>
              <p>Click "Connect" to establish the integration.</p>
            </StepItem>
            
            <StepItem step={3} title="Test the Connection">
              <p>After connecting, click "Send Test Notification" to verify the integration.</p>
              <p>Check your Microsoft Teams channel to confirm the test message was received.</p>
            </StepItem>
          </Steps>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-3">Configuring Notification Preferences</h3>
          <p className="mb-2">
            Once connected, you can configure which types of notifications are sent to Teams and which channels they are delivered to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-medium">Anomaly Alerts</span> - Urgent notifications when the AI detects unusual patterns in geological data
            </li>
            <li>
              <span className="font-medium">Daily Summaries</span> - Daily reports of analysis results and system activity
            </li>
            <li>
              <span className="font-medium">Task Notifications</span> - Updates when tasks are assigned, completed, or approaching deadlines
            </li>
            <li>
              <span className="font-medium">File Sharing</span> - Notifications when team members share or update important files
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            For each notification type, you can toggle it on/off and select which Teams channel should receive it.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-3">Best Practices</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Set up different channels for different types of notifications to reduce noise</li>
            <li>Consider using channel permissions in Teams to control who can see certain notification types</li>
            <li>Set up Power BI integration with Teams for enhanced data visualization</li>
            <li>Use adaptive cards for interactive notifications that can trigger actions directly from Teams</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-3">Troubleshooting</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-medium">Notifications not appearing in Teams</span> - Verify the webhook URL is correct and the connector is still active in Teams
            </li>
            <li>
              <span className="font-medium">Error messages when sending notifications</span> - Check that your Teams channel still exists and permissions haven't changed
            </li>
            <li>
              <span className="font-medium">Formatting issues in notifications</span> - Teams renders Markdown and limited HTML; check your message formatting
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamsIntegrationDocs;
