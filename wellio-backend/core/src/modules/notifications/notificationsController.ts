import { Request, Response } from 'express';
import { Notification, NotificationFilters, PaginatedResponse } from '@wellio/shared';
import { logger } from '../../common/logger';

// Mock data
const mockNotifications: Notification[] = [
  {
    id: '880e8400-e29b-41d4-a716-446655440001',
    user_id: 'user-123',
    type: 'message',
    payload: {
      message: 'New message from Emma Johnson',
      conversation_id: 'conv-123'
    },
    read_at: null,
    created_at: '2024-01-25T10:00:00Z'
  },
  {
    id: '880e8400-e29b-41d4-a716-446655440002',
    user_id: 'user-123',
    type: 'session',
    payload: {
      message: 'Session with Michael Chen in 30 minutes',
      session_id: 'session-123'
    },
    read_at: '2024-01-25T09:30:00Z',
    created_at: '2024-01-25T09:00:00Z'
  }
];

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const filters = req.query as unknown as NotificationFilters;
    logger.info('Getting notifications', { userId: req.user?.id, filters });

    let filteredNotifications = [...mockNotifications];

    if (filters.unread) {
      filteredNotifications = filteredNotifications.filter(notification =>
        notification.read_at === null
      );
    }

    const page = filters.page || 1;
    const pageSize = filters.page_size || 20;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);

    const response: PaginatedResponse<Notification> = {
      data: paginatedNotifications,
      pagination: {
        page,
        page_size: pageSize,
        total: filteredNotifications.length,
        total_pages: Math.ceil(filteredNotifications.length / pageSize),
        has_next: endIndex < filteredNotifications.length
      }
    };

    res.json({
      success: true,
      data: response
    });
  } catch (error) {
    logger.error('Error getting notifications:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get notifications'
      }
    });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    logger.info('Marking notification as read', { userId: req.user?.id, notificationId: id });

    const notification = mockNotifications.find(n => n.id === id);

    if (!notification) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Notification not found'
        }
      });
    }

    notification.read_at = new Date().toISOString();

    res.json({
      success: true,
      message: 'Notification marked as read'
    });
  } catch (error) {
    logger.error('Error marking notification as read:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to mark notification as read'
      }
    });
  }
};
