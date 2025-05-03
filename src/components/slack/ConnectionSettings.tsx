
import React from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { SlackIntegration as SlackIntegrationType } from "@/types";
import { sendToSlack } from "@/utils/slackIntegration";

interface ConnectionSettingsProps {
  config: SlackIntegrationType;
  onSaveSettings: (values: any) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const ConnectionSettings: React.FC<ConnectionSettingsProps> = ({ 
  config, 
  onSaveSettings,
  isLoading,
  setIsLoading
}) => {
  const form = useForm({
    defaultValues: {
      webhookUrl: config.webhookUrl,
      enabled: config.enabled
    }
  });

  React.useEffect(() => {
    // Update form when config changes
    form.reset({
      webhookUrl: config.webhookUrl,
      enabled: config.enabled
    });
  }, [config, form]);

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSaveSettings)} className="space-y-4">
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
  );
};

export default ConnectionSettings;
