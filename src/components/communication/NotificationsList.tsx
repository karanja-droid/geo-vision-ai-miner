
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Notification } from '@/types';
import { Slack } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { sendToSlack } from '@/utils/slackIntegration';

interface NotificationsListProps {
  notifications: Notification[];
}

const NotificationsList: React.FC<NotificationsListProps> = ({ notifications }) => {
  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Badge className="bg-green-500">✓</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500">!</Badge>;
      case 'error':
        return <Badge className="bg-red-500">×</Badge>;
      default:
        return <Badge className="bg-blue-500">i</Badge>;
    }
  };

  const handleShareToSlack = async (notification: Notification) => {
    const sent = await sendToSlack(
      `*${notification.title}*\n${notification.message}`,
      'general'
    );
    
    if (sent) {
      toast({
        title: "Notification Shared",
        description: "Alert sent to Slack channel",
      });
    }
  };

  return (
    <div className="h-[300px] overflow-y-auto border rounded-md p-2">
      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-3 rounded-lg border ${!notification.read ? 'bg-muted/50' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {getNotificationIcon(notification.type)}
                  <h4 className="font-medium">{notification.title}</h4>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatTime(notification.createdAt)}
                </span>
              </div>
              <p className="text-sm mt-1">
                {notification.message}
              </p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-muted-foreground">
                  {notification.workflowTriggered ? 'Triggered automated workflow' : ''}
                </span>
                {!notification.sentToSlack && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={() => handleShareToSlack(notification)}
                  >
                    <Slack size={12} className="mr-1" />
                    Share to Slack
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          <p>No notifications</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsList;
