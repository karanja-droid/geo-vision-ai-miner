
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slack, Share2, PenLine, MessageSquare } from "lucide-react";
import SlackCommunicator from '../slack/SlackCommunicator';
import { shareInsightsToSlack } from '@/utils/slack/communication';
import { toast } from '@/hooks/use-toast';

interface SlackCommunicationPanelProps {
  userName: string;
  userRole: string;
  className?: string;
}

const SlackCommunicationPanel: React.FC<SlackCommunicationPanelProps> = ({
  userName,
  userRole,
  className = ""
}) => {
  const [activeTab, setActiveTab] = useState('message');
  
  // Demo insights for the Share tab
  const demoInsights = [
    "High mineral concentration detected in northern sector (92% confidence)",
    "Geological formation suggests potential for copper deposits",
    "Analysis of satellite imagery shows favorable terrain features",
    "Historical drilling data correlates with current AI predictions",
    "Risk assessment indicates low environmental impact for extraction"
  ];
  
  const handleShareInsights = async () => {
    const result = await shareInsightsToSlack(
      demoInsights,
      "AI Analysis Results - Northern Sector",
      "analysis-results",
      { notifyUser: true }
    );
    
    if (!result) {
      toast({
        title: "Share Failed",
        description: "Could not share insights to Slack",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Slack className="h-5 w-5" />
          Slack Communications
        </CardTitle>
        <CardDescription>
          Send messages and share insights directly to your Slack channels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="message">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Send Message</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="share">
              <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                <span>Share Insights</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="compose">
              <div className="flex items-center gap-2">
                <PenLine className="h-4 w-4" />
                <span>Compose Update</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="message" className="space-y-4">
            <SlackCommunicator
              userName={userName}
              userRole={userRole}
              showChannelSelector={true}
            />
          </TabsContent>
          
          <TabsContent value="share" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">AI Analysis Insights</CardTitle>
                <CardDescription>Share these insights with your team</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {demoInsights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex justify-end mt-6">
                  <Button onClick={handleShareInsights} className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share to #analysis-results
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="compose" className="space-y-4">
            <SlackCommunicator
              userName={userName}
              userRole={userRole}
              defaultChannel="field-team"
              prefillMessage="## Field Update\n\nLocation: \nFindings: \nNext Steps: "
              showChannelSelector={true}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SlackCommunicationPanel;
