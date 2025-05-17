
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bug, MessageSquare, Star, Zap } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SubmitFeedbackToSlack } from '@/utils/beta/feedbackManager';

// Types for the feedback form
type FeedbackType = 'bug' | 'feature' | 'experience' | 'performance';

interface FeedbackTypeOption {
  id: FeedbackType;
  label: string;
  description: string;
  icon: JSX.Element;
}

const feedbackTypes: FeedbackTypeOption[] = [
  {
    id: 'bug',
    label: 'Bug Report',
    description: 'Something isn\'t working correctly',
    icon: <Bug className="h-4 w-4" />
  },
  {
    id: 'feature',
    label: 'Feature Request',
    description: 'Suggest a new feature or enhancement',
    icon: <Star className="h-4 w-4" />
  },
  {
    id: 'experience',
    label: 'User Experience',
    description: 'Share thoughts on usability',
    icon: <MessageSquare className="h-4 w-4" />
  },
  {
    id: 'performance',
    label: 'Performance Issue',
    description: 'Report slow loading or crashes',
    icon: <Zap className="h-4 w-4" />
  }
];

interface BetaFeedbackCollectorProps {
  module?: string; // Optional: allow specifying which module the feedback relates to
  triggerButtonText?: string;
}

const BetaFeedbackCollector: React.FC<BetaFeedbackCollectorProps> = ({
  module = 'general',
  triggerButtonText = 'Share Feedback'
}) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('feature');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    if (!feedbackText.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const feedbackData = {
        feedbackId: `feedback_${Date.now()}`,
        type: feedbackType,
        text: feedbackText,
        module,
        timestamp: new Date().toISOString(),
        priority: feedbackType === 'bug' ? 'high' : 'medium'
      };
      
      // Submit to Slack
      await SubmitFeedbackToSlack(feedbackData);
      
      // Reset form and close dialog
      setFeedbackText('');
      setIsSubmitting(false);
      setIsOpen(false);
      
      // Display success message
      // You could use your toast system here
      console.log('Feedback submitted successfully');
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setIsSubmitting(false);
      // Display error message
      // You could use your toast system here
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerButtonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Beta Program Feedback</DialogTitle>
          <DialogDescription>
            Your feedback helps us improve the GeoVision AI platform. Thank you for participating in our beta program!
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <RadioGroup 
            value={feedbackType} 
            onValueChange={(value) => setFeedbackType(value as FeedbackType)}
            className="grid grid-cols-2 gap-3"
          >
            {feedbackTypes.map((type) => (
              <div key={type.id} className="flex items-start space-x-3 space-y-0">
                <RadioGroupItem value={type.id} id={type.id} />
                <Label htmlFor={type.id} className="flex flex-col cursor-pointer">
                  <div className="flex items-center">
                    {type.icon}
                    <span className="ml-2 font-medium">{type.label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">{type.description}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
          
          <div className="space-y-2">
            <Label htmlFor="feedback">Your Feedback</Label>
            <Textarea
              id="feedback"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Please provide details about your experience..."
              className="min-h-[120px]"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="secondary" 
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!feedbackText.trim() || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BetaFeedbackCollector;
