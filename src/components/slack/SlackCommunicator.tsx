
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slack, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { sendDirectMessage, sendUserMessage, shareInsightsToSlack } from "@/utils/slack/communication";
import { getSlackConfig } from "@/utils/slack/config";

interface SlackCommunicatorProps {
  userName: string;
  userRole: string;
  className?: string;
  defaultChannel?: string;
  prefillMessage?: string;
  showChannelSelector?: boolean;
  onMessageSent?: () => void;
}

interface FormValues {
  message: string;
  channel: string;
}

const SlackCommunicator: React.FC<SlackCommunicatorProps> = ({
  userName,
  userRole,
  className = '',
  defaultChannel = 'general',
  prefillMessage = '',
  showChannelSelector = true,
  onMessageSent
}) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      message: prefillMessage,
      channel: defaultChannel
    }
  });
  
  const [slackStatus, setSlackStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const config = getSlackConfig();
  
  // Get available channels from Slack config
  const availableChannels = React.useMemo(() => {
    const channels = new Set<string>();
    
    // Add channels from notification preferences
    config.notificationPreferences.forEach(pref => {
      channels.add(pref.slackChannelId);
    });
    
    // Add default channel
    channels.add(defaultChannel);
    
    // Add monitoring channel if it exists
    if (config.monitoringSettings?.alertChannel) {
      channels.add(config.monitoringSettings.alertChannel);
    }
    
    return Array.from(channels);
  }, [config, defaultChannel]);

  const onSubmit = async (data: FormValues) => {
    if (!config.enabled || !config.webhookUrl) {
      toast({
        title: "Slack Not Configured",
        description: "Please enable and configure Slack integration in settings first",
        variant: "destructive"
      });
      return;
    }
    
    setSlackStatus('sending');
    
    try {
      const result = await sendUserMessage(
        data.message,
        userName,
        userRole,
        data.channel,
        { 
          notifyUser: false,
          includeTimestamp: true
        }
      );
      
      if (result) {
        setSlackStatus('sent');
        toast({
          title: "Message Sent",
          description: `Your message has been sent to #${data.channel}`,
        });
        
        // Reset the form
        reset({ message: '', channel: data.channel });
        
        // Call the callback if provided
        if (onMessageSent) onMessageSent();
      } else {
        setSlackStatus('error');
        toast({
          title: "Failed to Send",
          description: "Could not send message. Check your Slack configuration.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error sending to Slack:", error);
      setSlackStatus('error');
      toast({
        title: "Error",
        description: "An unexpected error occurred while sending the message",
        variant: "destructive"
      });
    } finally {
      // Reset status after a delay
      setTimeout(() => setSlackStatus('idle'), 3000);
    }
  };

  if (!config.enabled) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Slack className="w-5 h-5" />
            Slack Communication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Slack className="w-12 h-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground mb-4">Slack integration is not enabled</p>
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/settings/integrations'}>
              Configure Slack
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Slack className="w-5 h-5" />
          Slack Communication
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {showChannelSelector && (
            <div className="mb-4">
              <Label htmlFor="channel" className="block mb-2">Channel</Label>
              <Select defaultValue={defaultChannel} onValueChange={(value) => register("channel").onChange({ target: { value } })}>
                <SelectTrigger id="channel">
                  <SelectValue placeholder="Select a channel" />
                </SelectTrigger>
                <SelectContent>
                  {availableChannels.map((channel) => (
                    <SelectItem key={channel} value={channel}>
                      #{channel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="mb-4">
            <Label htmlFor="message" className="block mb-2">Message</Label>
            <Textarea 
              id="message"
              placeholder="Type your message to send to Slack..."
              rows={4}
              {...register("message", { required: "Message is required" })}
              className={errors.message ? "border-red-500" : ""}
            />
            {errors.message && (
              <span className="text-red-500 text-sm mt-1">{errors.message.message}</span>
            )}
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting || slackStatus === 'sending'}
              className="flex items-center gap-2"
            >
              {slackStatus === 'sending' ? (
                <>Sending<span className="animate-pulse">...</span></>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send to Slack
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <span className="text-xs text-muted-foreground">
          Sending as {userName} ({userRole})
        </span>
        <div className={`h-2 w-2 rounded-full ${slackStatus === 'sent' ? 'bg-green-500' : slackStatus === 'error' ? 'bg-red-500' : 'bg-gray-300'}`}></div>
      </CardFooter>
    </Card>
  );
};

export default SlackCommunicator;
