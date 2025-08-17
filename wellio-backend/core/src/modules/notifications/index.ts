import { Router } from 'express';
import { getNotifications, markAsRead } from './notificationsController';
import { validateRequest } from '../../common/validation';
import { NotificationFiltersSchema } from '@wellio/shared';

const router = Router();

// GET /api/v1/notifications
router.get('/', validateRequest(NotificationFiltersSchema), getNotifications);

// POST /api/v1/notifications/:id/read
router.post('/:id/read', markAsRead);

export { router as notificationsRouter };
