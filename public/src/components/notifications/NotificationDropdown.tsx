import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { format } from 'date-fns';
import { BellIcon, CheckIcon } from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { useNotifications, type NotificationType } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

// Map notification types to icons and colors
const notificationConfig: Record<NotificationType, { icon: React.ReactNode, color: string }> = {
  transaction: {
    icon: <span className="i-lucide-credit-card text-lg" />,
    color: 'bg-blue-100 text-blue-700'
  },
  budget_alert: {
    icon: <span className="i-lucide-pie-chart text-lg" />,
    color: 'bg-amber-100 text-amber-700'
  },
  payment_reminder: {
    icon: <span className="i-lucide-calendar-clock text-lg" />,
    color: 'bg-purple-100 text-purple-700'
  },
  whatsapp_alert: {
    icon: <span className="i-lucide-message-circle text-lg" />,
    color: 'bg-green-100 text-green-700'
  },
  goal_progress: {
    icon: <span className="i-lucide-target text-lg" />,
    color: 'bg-indigo-100 text-indigo-700'
  },
  system: {
    icon: <span className="i-lucide-info text-lg" />,
    color: 'bg-gray-100 text-gray-700'
  }
};

export function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Auto-close the popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Function to handle item click
  const handleItemClick = (notification: any) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return format(date, 'h:mm a');
    } else {
      return format(date, 'MMM d');
    }
  };

  // Get recent notifications (last 5)
  const recentNotifications = notifications.slice(0, 5);

  return (
    <div ref={popoverRef}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="relative flex flex-col items-center hover:text-primary/80 transition-colors">
            <div className="relative">
              <BellIcon className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">Alerts</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="flex items-center justify-between p-4">
            <h4 className="font-medium">Notifications</h4>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={() => markAllAsRead()}>
                <CheckIcon className="mr-1 h-3.5 w-3.5" />
                Mark all read
              </Button>
            )}
          </div>
          <Separator />
          <ScrollArea className="h-[300px]">
            {recentNotifications.length > 0 ? (
              <div className="divide-y">
                {recentNotifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`relative p-4 ${!notification.isRead ? 'bg-muted/50' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${notificationConfig[notification.type as NotificationType]?.color}`}>
                        {notificationConfig[notification.type as NotificationType]?.icon}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            {notification.title}
                            {!notification.isRead && (
                              <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(notification.createdAt)}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {notification.actionUrl && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="h-7 px-2 text-xs"
                              onClick={() => handleItemClick(notification)}
                              asChild
                            >
                              <Link href={notification.actionUrl}>
                                View details
                              </Link>
                            </Button>
                          )}
                          {!notification.isRead && (
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="h-7 px-2 text-xs"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4">
                <div className="rounded-full bg-muted p-3 mb-2">
                  <BellIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  No notifications yet
                </p>
              </div>
            )}
          </ScrollArea>
          <Separator />
          <div className="p-2">
            <Button variant="ghost" className="w-full justify-center" asChild>
              <Link href="/notifications" onClick={() => setOpen(false)}>
                View all notifications
              </Link>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}