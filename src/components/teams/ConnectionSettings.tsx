
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ConnectionSettingsProps {
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onTestNotification: () => void;
  isTesting: boolean;
  platform: string;
}

const ConnectionSettings: React.FC<ConnectionSettingsProps> = ({
  webhookUrl,
  setWebhookUrl,
  isConnected,
  onConnect,
  onDisconnect,
  onTestNotification,
  isTesting,
  platform
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="webhook-url">Incoming Webhook URL</Label>
        <div className="flex gap-2">
          <Input
            id="webhook-url"
            placeholder={`Enter your ${platform} webhook URL`}
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            disabled={isConnected}
            className="flex-1"
          />
          {isConnected ? (
            <Button variant="outline" onClick={onDisconnect}>Disconnect</Button>
          ) : (
            <Button onClick={onConnect}>Connect</Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {isConnected
            ? `${platform} integration is active. You can disconnect at any time.`
            : `Enter the Incoming Webhook URL from your ${platform} app configuration.`}
        </p>
      </div>

      {isConnected && (
        <div className="pt-2">
          <Button 
            variant="outline" 
            onClick={onTestNotification} 
            disabled={isTesting}
            className="w-full"
          >
            {isTesting ? `Sending Test Notification...` : `Send Test Notification to ${platform}`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConnectionSettings;
