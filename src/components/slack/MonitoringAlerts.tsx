import React from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { SlackIntegration as SlackIntegrationType } from "@/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Info } from "lucide-react";
import { BetaBanner } from "../feedback/BetaBanner";

interface MonitoringAlertsProps {
  config: SlackIntegrationType;
  onUpdateConfig: (config: SlackIntegrationType) => void;
}

const MonitoringAlerts: React.FC<MonitoringAlertsProps> = ({ config, onUpdateConfig }) => {
  // Initialize with defaults if monitoring settings don't exist
  if (!config.monitoringSettings) {
    config.monitoringSettings = {
      errorMonitoring: true,
      performanceMonitoring: true,
      apiMonitoring: false,
      errorThreshold: 5,
      performanceThreshold: 3000, // ms
      alertChannel: "monitoring-alerts",
      alertFrequency: "immediate",
      monitorWarnings: false // Initialize with default value
    };
  }

  const form = useForm({
    defaultValues: {
      errorMonitoring: config.monitoringSettings.errorMonitoring,
      performanceMonitoring: config.monitoringSettings.performanceMonitoring,
      apiMonitoring: config.monitoringSettings.apiMonitoring,
      errorThreshold: config.monitoringSettings.errorThreshold,
      performanceThreshold: config.monitoringSettings.performanceThreshold,
      alertChannel: config.monitoringSettings.alertChannel,
      alertFrequency: config.monitoringSettings.alertFrequency,
      monitorWarnings: config.monitoringSettings.monitorWarnings || false // Add with default
    }
  });

  const handleSubmit = (values: any) => {
    // Update config with new monitoring settings
    const newConfig = {
      ...config,
      monitoringSettings: { ...values }
    };
    
    onUpdateConfig(newConfig);
    
    toast({
      title: "Monitoring Settings Updated",
      description: "Your monitoring and alert settings have been saved."
    });
  };

  const handleTestErrorAlert = () => {
    toast({
      title: "Test Error Alert Sent",
      description: "A test error alert was sent to your configured Slack channel.",
    });
    
    // This would typically call an API to send a test alert
    console.log("Sending test error alert to Slack");
  };

  return (
    <div className="space-y-6">
      <BetaBanner show={true} />
      
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          Configure real-time monitoring alerts to stay on top of system health and performance issues.
        </AlertDescription>
      </Alert>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Alert Types</h3>
            
            <FormField
              control={form.control}
              name="errorMonitoring"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Error Monitoring</FormLabel>
                    <FormDescription>
                      Get alerts when frontend or backend errors occur
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
            
            <FormField
              control={form.control}
              name="performanceMonitoring"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Performance Monitoring</FormLabel>
                    <FormDescription>
                      Get alerts when system performance degrades
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
            
            <FormField
              control={form.control}
              name="apiMonitoring"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">API Health Monitoring</FormLabel>
                    <FormDescription>
                      Get alerts when external APIs experience downtime
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
            
            {/* Add new switch for monitorWarnings */}
            <FormField
              control={form.control}
              name="monitorWarnings"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Warning Monitoring</FormLabel>
                    <FormDescription>
                      Get alerts for console warnings in addition to errors
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
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Alert Thresholds</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="errorThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Error Threshold (count)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value) || 1)} 
                      />
                    </FormControl>
                    <FormDescription>
                      Number of errors before triggering an alert
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="performanceThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Performance Threshold (ms)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value) || 1000)} 
                      />
                    </FormControl>
                    <FormDescription>
                      Response time threshold in milliseconds
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Alert Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="alertChannel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alert Channel</FormLabel>
                    <FormControl>
                      <Input placeholder="Slack channel name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Slack channel to receive monitoring alerts
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="alertFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alert Frequency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="hourly">Hourly Digest</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How often should alerts be sent
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button type="submit">Save Settings</Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleTestErrorAlert}
              disabled={!config.enabled || !form.watch('errorMonitoring')}
            >
              Test Error Alert
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MonitoringAlerts;
