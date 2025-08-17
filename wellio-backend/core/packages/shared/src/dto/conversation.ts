import { z } from 'zod';

export const ConversationSchema = z.object({
  id: z.string().uuid(),
  client_id: z.string().uuid(),
  last_message_at: z.string().datetime().nullable(),
  unread_count: z.number().min(0).default(0),
});

export const ConversationFiltersSchema = z.object({
  only_unread: z.boolean().optional(),
  query: z.string().optional(),
  page: z.number().min(1).default(1),
  page_size: z.number().min(1).max(100).default(20),
});

export type Conversation = z.infer<typeof ConversationSchema>;
export type ConversationFilters = z.infer<typeof ConversationFiltersSchema>;
