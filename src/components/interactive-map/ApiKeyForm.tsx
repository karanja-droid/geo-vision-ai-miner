
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface ApiKeyFormProps {
  apiKey: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => void;
}

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ apiKey, setApiKey, onSubmit }) => {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Enter Google Maps API Key</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter your Google Maps API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Get your API key from <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noreferrer" className="underline">Google Cloud Console</a>
            </p>
          </div>
          <Button type="submit" className="w-full">Load Map</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ApiKeyForm;
