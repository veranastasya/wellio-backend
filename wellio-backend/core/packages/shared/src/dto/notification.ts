import { z } from 'zod';
import { NotificationType } from '../common/types';

export const NotificationSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  type: z.enum(['message', 'session', 'reminder', 'insight', 'system']),
  payload: z.record(z.any()),
  read_at: z.string().datetime().nullable(),
  created_at: z.string().datetime(),
});

export const NotificationFiltersSchema = z.object({
  unread: z.boolean().optional(),
  page: z.number().min(1).default(1),
  page_size: z.number().min(1).max(100).default(20),
});

export type Notification = z.infer<typeof NotificationSchema>;
export type NotificationFilters = z.infer<typeof NotificationFiltersSchema>;
