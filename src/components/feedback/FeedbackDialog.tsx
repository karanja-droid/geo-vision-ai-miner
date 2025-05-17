
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare } from "lucide-react";
import { handleError } from "@/utils/errorHandler";

interface FeedbackSubmission {
  type: "issue" | "suggestion" | "question";
  title: string;
  description: string;
  email?: string;
}

interface FeedbackDialogProps {
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive" | null;
  buttonSize?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ 
  buttonVariant = "outline", 
  buttonSize = "default", 
  className = ""
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackSubmission>({
    type: "issue",
    title: "",
    description: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // In a real implementation, this would send the feedback to a backend service
      // For now, just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! Our team will review it shortly.",
      });
      
      setFeedback({
        type: "issue",
        title: "",
        description: "",
        email: "",
      });
      
      setOpen(false);
    } catch (error) {
      handleError(error, "Failed to submit feedback. Please try again later.", "medium", {
        component: "FeedbackDialog",
        action: "submitFeedback"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize} className={className}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Send Feedback</DialogTitle>
            <DialogDescription>
              Your feedback helps us improve the platform. Let us know about any issues, suggestions, or questions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="feedback-type" className="text-right">
                Type
              </Label>
              <select
                id="feedback-type"
                className="col-span-3 w-full rounded-md border border-input bg-background px-3 py-2"
                value={feedback.type}
                onChange={(e) => setFeedback({ ...feedback, type: e.target.value as any })}
                required
              >
                <option value="issue">Issue/Bug</option>
                <option value="suggestion">Suggestion</option>
                <option value="question">Question</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Brief summary of your feedback"
                className="col-span-3"
                value={feedback.title}
                onChange={(e) => setFeedback({ ...feedback, title: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Please provide details..."
                className="col-span-3"
                rows={4}
                value={feedback.description}
                onChange={(e) => setFeedback({ ...feedback, description: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email (optional)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email for follow-up"
                className="col-span-3"
                value={feedback.email || ""}
                onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
