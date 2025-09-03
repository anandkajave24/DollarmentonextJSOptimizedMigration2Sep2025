import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { format } from 'date-fns';
import { CheckIcon, ChevronLeftIcon, TrashIcon } from 'lucide-react';
import { useNotifications, type Notification, type NotificationType } from '../contexts/NotificationContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

// Map notification types to icons and colors
const notificationConfig: Record<NotificationType, { icon: React.ReactNode, color: string, label: string }> = {
  transaction: {
    icon: <span className="i-lucide-credit-card text-lg" />,
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    label: 'Transaction'
  },
  budget_alert: {
    icon: <span className="i-lucide-pie-chart text-lg" />,
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    label: 'Budget Alert'
  },
  payment_reminder: {
    icon: <span className="i-lucide-calendar-clock text-lg" />,
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    label: 'Payment Reminder'
  },
  whatsapp_alert: {
    icon: <span className="i-lucide-message-circle text-lg" />,
    color: 'bg-green-100 text-green-700 border-green-200',
    label: 'WhatsApp Alert'
  },
  goal_progress: {
    icon: <span className="i-lucide-target text-lg" />,
    color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    label: 'Goal Progress'
  },
  system: {
    icon: <span className="i-lucide-info text-lg" />,
    color: 'bg-gray-100 text-gray-700 border-gray-200',
    label: 'System'
  }
};

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const [filter, setFilter] = useState<string>('all');
  const [tab, setTab] = useState(unreadCount > 0 ? 'unread' : 'all');

  // Filtered notifications
  const filteredNotifications = notifications.filter(notification => {
    // First filter by tab (all/unread)
    if (tab === 'unread' && notification.isRead) return false;
    
    // Then filter by type if specified
    if (filter !== 'all' && notification.type !== filter) return false;
    
    return true;
  });

  // Count by type
  const typeCounts = notifications.reduce((acc: Record<string, number>, notification) => {
    const type = notification.type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  // Function to handle marking as read
  const handleMarkAsRead = (id: number) => {
    markAsRead(id);
  };

  // Function to handle delete
  const handleDelete = (id: number) => {
    deleteNotification(id);
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${format(date, 'h:mm a')}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${format(date, 'h:mm a')}`;
    } else {
      return format(date, 'MMM d, yyyy • h:mm a');
    }
  };

  // Group notifications by date
  const groupedNotifications: Record<string, Notification[]> = {};
  
  filteredNotifications.forEach(notification => {
    const date = new Date(notification.createdAt).toDateString();
    if (!groupedNotifications[date]) {
      groupedNotifications[date] = [];
    }
    groupedNotifications[date].push(notification);
  });

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedNotifications).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="container max-w-5xl py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ChevronLeftIcon className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge className="ml-2">{unreadCount} Unread</Badge>
          )}
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={() => markAllAsRead()}>
              <CheckIcon className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          )}
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.entries(notificationConfig).map(([type, config]) => (
                <SelectItem key={type} value={type}>
                  <span className="flex items-center gap-2">
                    {config.icon}
                    {config.label}
                    {typeCounts[type] && (
                      <Badge variant="outline" className="ml-auto">
                        {typeCounts[type]}
                      </Badge>
                    )}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4 pb-0">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-[200px] grid-cols-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-6">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-8">
              {sortedDates.map(date => (
                <div key={date}>
                  <h3 className="mb-4 text-sm font-medium text-muted-foreground">
                    {(() => {
                      const notificationDate = new Date(date);
                      const today = new Date();
                      const yesterday = new Date(today);
                      yesterday.setDate(yesterday.getDate() - 1);

                      if (notificationDate.toDateString() === today.toDateString()) {
                        return 'Today';
                      } else if (notificationDate.toDateString() === yesterday.toDateString()) {
                        return 'Yesterday';
                      } else {
                        return format(notificationDate, 'MMMM d, yyyy');
                      }
                    })()}
                  </h3>
                  <div className="space-y-4">
                    {groupedNotifications[date].map(notification => (
                      <div 
                        key={notification.id} 
                        className={`relative flex p-4 rounded-lg border ${notification.isRead ? 'bg-background' : 'bg-muted/30'}`}
                      >
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${notificationConfig[notification.type as NotificationType]?.color}`}>
                          {notificationConfig[notification.type as NotificationType]?.icon}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm font-medium">
                                {notification.title}
                                {!notification.isRead && (
                                  <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                                )}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(notification.createdAt)}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div>
                              <Badge variant="outline" className={notificationConfig[notification.type as NotificationType]?.color}>
                                {notificationConfig[notification.type as NotificationType]?.label}
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              {!notification.isRead && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  <CheckIcon className="mr-1 h-3.5 w-3.5" />
                                  Mark as read
                                </Button>
                              )}
                              {notification.actionUrl && (
                                <Button size="sm" asChild>
                                  <Link href={notification.actionUrl}>
                                    View details
                                  </Link>
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleDelete(notification.id)}
                              >
                                <TrashIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <span className="i-lucide-bell-off h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No notifications found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {tab === 'unread' ? 'You have no unread notifications.' : filter !== 'all' ? `No ${notificationConfig[filter as NotificationType]?.label.toLowerCase()} notifications found.` : 'You don\'t have any notifications yet.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}