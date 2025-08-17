import { z } from 'zod';
import { MessageSender } from '../common/types';

export const MessageSchema = z.object({
  id: z.string().uuid(),
  conversation_id: z.string().uuid(),
  client_id: z.string().uuid(),
  sender: z.enum(['coach', 'client']),
  text: z.string().min(1, 'Message text is required'),
  created_at: z.string().datetime(),
});

export const CreateMessageSchema = MessageSchema.omit({ 
  id: true, 
  created_at: true 
});

export const MessageFiltersSchema = z.object({
  conversation_id: z.string().uuid().optional(),
  after: z.string().datetime().optional(),
  limit: z.number().min(1).max(100).default(20),
});

export type Message = z.infer<typeof MessageSchema>;
export type CreateMessage = z.infer<typeof CreateMessageSchema>;
export type MessageFilters = z.infer<typeof MessageFiltersSchema>;
