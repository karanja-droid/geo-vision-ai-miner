
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Slack, AlarmClock, CalendarDays, Bell, FilePlus } from "lucide-react";
import { getSlackConfig, saveSlackConfig, sendToSlack } from "@/utils/slackIntegration";
import { SlackIntegration as SlackIntegrationType, SlackNotificationPreference } from "@/types";

interface SlackIntegrationProps {
  className?: string;
}

const SlackIntegration: React.FC<SlackIntegrationProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<SlackIntegrationType>(getSlackConfig());
  
  const form = useForm({
    defaultValues: {
      webhookUrl: config.webhookUrl,
      enabled: config.enabled
    }
  });

  useEffect(() => {
    // Update form when config changes
    form.reset({
      webhookUrl: config.webhookUrl,
      enabled: config.enabled
    });
  }, [config, form]);

  const handleSaveSettings = (values: any) => {
    setIsLoading(true);
    
    // Update config with new values
    const newConfig = {
      ...config,
      webhookUrl: values.webhookUrl,
      enabled: values.enabled
    };
    
    // Save to storage
    saveSlackConfig(newConfig);
    setConfig(newConfig);
    
    toast({
      title: "Settings Saved",
      description: "Slack integration settings have been updated",
    });
    
    setIsLoading(false);
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    
    // Test the connection by sending a test message
    const success = await sendToSlack(
      "🧪 Test message from Geological Analysis Platform", 
      undefined,
      [{
        color: "#36a64f",
        title: "Connection Test",
        text: "If you're seeing this message, the integration is working correctly!",
        fields: [
          { title: "Timestamp", value: new Date().toLocaleString(), short: true },
          { title: "Environment", value: "Testing", short: true }
        ]
      }]
    );
    
    if (success) {
      toast({
        title: "Connection Successful",
        description: "Successfully connected to Slack",
      });
    } else {
      toast({
        title: "Connection Failed",
        description: "Could not connect to Slack. Please check your webhook URL.",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const toggleNotificationType = (type: SlackNotificationPreference['type']) => {
    const newConfig = { ...config };
    const index = newConfig.notificationPreferences.findIndex(p => p.type === type);
    
    if (index !== -1) {
      newConfig.notificationPreferences[index].enabled = !newConfig.notificationPreferences[index].enabled;
      saveSlackConfig(newConfig);
      setConfig(newConfig);
      
      toast({
        title: "Notification Setting Updated",
        description: `${type.replace('_', ' ')} notifications have been ${newConfig.notificationPreferences[index].enabled ? 'enabled' : 'disabled'}`,
      });
    }
  };

  const getFeatureIcon = (type: SlackNotificationPreference['type']) => {
    switch (type) {
      case 'anomaly_alerts':
        return <AlarmClock className="h-5 w-5" />;
      case 'daily_summaries':
        return <CalendarDays className="h-5 w-5" />;
      case 'task_notifications':
        return <Bell className="h-5 w-5" />;
      case 'file_sharing':
        return <FilePlus className="h-5 w-5" />;
      default:
        return <Slack className="h-5 w-5" />;
    }
  };

  const getFeatureTitle = (type: SlackNotificationPreference['type']) => {
    switch (type) {
      case 'anomaly_alerts':
        return 'Automated Anomaly Detection Alerts';
      case 'daily_summaries':
        return 'Daily AI Analysis Summaries';
      case 'task_notifications':
        return 'Task Notifications for Field Teams';
      case 'file_sharing':
        return 'Direct File Sharing';
      default:
        return type.replace('_', ' ');
    }
  };

  const getFeatureDescription = (type: SlackNotificationPreference['type']) => {
    switch (type) {
      case 'anomaly_alerts':
        return 'Send real-time alerts when AI detects geological anomalies that may indicate mineral deposits';
      case 'daily_summaries':
        return 'Automated daily reports of AI analysis results, insights and predictions';
      case 'task_notifications':
        return 'Notify field teams about new assignments, priority changes, and task updates';
      case 'file_sharing':
        return 'Share analysis reports, geological maps, and other documents directly to Slack';
      default:
        return '';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Slack className="h-5 w-5" />
          <CardTitle>Slack Integration</CardTitle>
        </div>
        <CardDescription>
          Connect with Slack to enhance team collaboration and receive real-time notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="settings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="settings">Connection Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notification Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSaveSettings)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="webhookUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slack Webhook URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://hooks.slack.com/services/..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Create an incoming webhook in your Slack workspace and paste the URL here
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="enabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Enable Slack Integration
                        </FormLabel>
                        <FormDescription>
                          Turn on to activate all Slack features
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="flex space-x-2">
                  <Button type="submit" disabled={isLoading}>
                    Save Settings
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleTestConnection} 
                    disabled={isLoading || !form.watch('webhookUrl') || !form.watch('enabled')}
                  >
                    Test Connection
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="notifications">
            <div className="space-y-4">
              {config.notificationPreferences.map((preference) => (
                <div key={preference.type} className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="flex items-start space-x-3">
                    {getFeatureIcon(preference.type)}
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium leading-none">
                        {getFeatureTitle(preference.type)}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {getFeatureDescription(preference.type)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Channel: #{preference.slackChannelId}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={preference.enabled}
                    onCheckedChange={() => toggleNotificationType(preference.type)}
                    disabled={!config.enabled}
                  />
                </div>
              ))}
              
              <Separator className="my-4" />
              
              <div className="rounded-lg border p-4 bg-muted/50">
                <h4 className="font-medium mb-2">Implementation Status</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span>Automated Alerts for Anomaly Detection</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span>Daily Summaries of AI Analysis Results</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span>Task Notifications for Field Teams</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span>Direct File Sharing from Platform</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SlackIntegration;
