
import React from "react";
import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeedbackDialog } from "./FeedbackDialog";

interface FloatingFeedbackButtonProps {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
}

const positionClasses = {
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
};

export const FloatingFeedbackButton: React.FC<FloatingFeedbackButtonProps> = ({
  position = "bottom-right",
  className = "",
}) => {
  return (
    <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
      <FeedbackDialog
        buttonVariant="default"
        buttonSize="default"
        className="rounded-full shadow-lg p-4 h-14 w-14 flex items-center justify-center"
      >
        <MessageSquarePlus className="h-6 w-6" />
      </FeedbackDialog>
    </div>
  );
};

export default FloatingFeedbackButton;
