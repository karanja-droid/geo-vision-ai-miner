
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { BugAntennaeIcon, Lightbulb, ThumbsUp, ThumbsDown, SendIcon } from "lucide-react";
import { sendDirectMessage } from "@/utils/slack/communication";

export type FeedbackType = 'bug' | 'feature' | 'experience' | 'performance';

interface BetaFeedbackCollectorProps {
  moduleId?: string;
  moduleName?: string;
  slackChannel?: string;
}

export const BetaFeedbackCollector: React.FC<BetaFeedbackCollectorProps> = ({ 
  moduleId,
  moduleName = "General",
  slackChannel = "beta-feedback"
}) => {
  const { toast } = useToast();
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('experience');
  const [feedbackText, setFeedbackText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const feedbackTypeOptions: {value: FeedbackType, label: string, icon: React.ReactNode}[] = [
    { value: 'bug', label: 'Bug Report', icon: <BugAntennaeIcon className="h-4 w-4" /> },
    { value: 'feature', label: 'Feature Request', icon: <Lightbulb className="h-4 w-4" /> },
    { value: 'experience', label: 'User Experience', icon: <ThumbsUp className="h-4 w-4" /> },
    { value: 'performance', label: 'Performance Issue', icon: <ThumbsDown className="h-4 w-4" /> }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedbackText.trim()) {
      toast({
        title: "Feedback required",
        description: "Please provide some details about your feedback.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      // Format feedback for slack channel
      const typeLabel = feedbackTypeOptions.find(opt => opt.value === feedbackType)?.label;
      const feedbackMessage = `*Beta Feedback - ${typeLabel}*\n*Module:* ${moduleName}${moduleId ? ` (${moduleId})` : ''}\n\n${feedbackText}\n\n_Submitted from the beta application_`;
      
      // Send to Slack if integrated
      await sendDirectMessage(feedbackMessage, slackChannel);
      
      // Save to local database or storage
      // In a real implementation, you would also save to your backend
      const feedbackItems = JSON.parse(localStorage.getItem('betaFeedback') || '[]');
      feedbackItems.push({
        id: Date.now(),
        type: feedbackType,
        text: feedbackText,
        moduleId,
        moduleName,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('betaFeedback', JSON.stringify(feedbackItems));
      
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback! The team will review it shortly.",
      });
      
      setFeedbackText('');
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SendIcon className="h-5 w-5 text-primary" />
          Beta Feedback
        </CardTitle>
        <CardDescription>
          Share your thoughts on the {moduleName} module to help us improve
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Feedback Type</Label>
            <RadioGroup 
              value={feedbackType} 
              onValueChange={(value) => setFeedbackType(value as FeedbackType)}
              className="flex flex-wrap gap-2"
            >
              {feedbackTypeOptions.map(option => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex items-center gap-1 cursor-pointer">
                    {option.icon}
                    <span>{option.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="feedback">Your Feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Please describe your experience, issue, or suggestion..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              rows={5}
              className="resize-none"
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" disabled={submitting || !feedbackText.trim()}>
            {submitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
