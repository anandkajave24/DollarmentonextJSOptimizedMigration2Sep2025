import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../lib/queryClient';
import { useToast } from '../hooks/use-toast';
import { useWebSocket } from './WebSocketContext';
import type WebSocket from 'ws';

// Define notification types
export type NotificationType = 
  | 'transaction' 
  | 'budget_alert' 
  | 'payment_reminder'
  | 'whatsapp_alert'
  | 'goal_progress'
  | 'system';

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  metadata?: any;
  createdAt: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  addNotification: (notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) => void;
  deleteNotification: (id: number) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();
  const { socket } = useWebSocket();

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  // Mark a notification as read
  const markAsRead = async (id: number) => {
    try {
      const response = await fetch(`/api/notifications/${id}/read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        setNotifications(prev => 
          prev.map(n => n.id === id ? { ...n, isRead: true } : n)
        );
      }
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const response = await fetch('/api/notifications/read-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        setNotifications(prev => 
          prev.map(n => ({ ...n, isRead: true }))
        );
      }
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  // Delete a notification
  const deleteNotification = async (id: number) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  // Add a local notification (useful for transient notifications)
  const addNotification = (notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now(), // Temporary ID for local notifications
      isRead: false,
      createdAt: new Date().toISOString()
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for certain notification types
    if (!['system', 'whatsapp_alert'].includes(notification.type)) {
      toast({
        title: notification.title,
        description: notification.message,
      });
    }
  };

  // Listen for WebSocket notifications
  useEffect(() => {
    if (socket) {
      const handleNotification = (data: any) => {
        if (data.type === 'notification') {
          addNotification({
            type: data.notification.type as NotificationType,
            title: data.notification.title,
            message: data.notification.message,
            actionUrl: data.notification.actionUrl,
            metadata: data.notification.metadata,
          });
        }
      };

      socket.addEventListener('message', (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'notification') {
            handleNotification(data);
          }
        } catch (error) {
          console.error('Error parsing WebSocket notification:', error);
        }
      });

      return () => {
        // Clean up if needed
      };
    }
  }, [socket]);

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();

    // Create demo notifications for testing
    // In production, these would come from the server
    addNotification({
      type: 'transaction',
      title: 'New Transaction Detected',
      message: 'A transaction of ₹2,500 was detected at Amazon.',
      actionUrl: '/spending-patterns'
    });

    addNotification({
      type: 'budget_alert',
      title: 'Budget Alert',
      message: 'Your Shopping budget is 85% spent this month.',
      actionUrl: '/budget-buddy'
    });

    addNotification({
      type: 'payment_reminder',
      title: 'Payment Due Soon',
      message: 'Your credit card payment of ₹12,450 is due in 3 days.',
      actionUrl: '/credit-debt-overview'
    });
  }, []);

  const value = {
    notifications,
    unreadCount,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    addNotification,
    deleteNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};