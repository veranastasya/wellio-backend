import { z } from 'zod';
import { SessionStatus } from '../common/types';

export const SessionSchema = z.object({
  id: z.string().uuid(),
  client_id: z.string().uuid(),
  service: z.string().min(1, 'Service is required'),
  start_at: z.string().datetime(),
  duration_min: z.number().min(1, 'Duration must be at least 1 minute'),
  status: z.enum(['scheduled', 'completed', 'canceled']).default('scheduled'),
  join_url: z.string().url().nullable(),
});

export const CreateSessionSchema = SessionSchema.omit({ 
  id: true, 
  join_url: true 
});

export const UpdateSessionSchema = CreateSessionSchema.partial();

export const SessionFiltersSchema = z.object({
  when: z.enum(['today', 'tomorrow', 'this_week', 'next_week']).optional(),
  status: z.string().optional(),
  client_id: z.string().uuid().optional(),
  limit: z.number().min(1).max(100).default(20),
});

export type Session = z.infer<typeof SessionSchema>;
export type CreateSession = z.infer<typeof CreateSessionSchema>;
export type UpdateSession = z.infer<typeof UpdateSessionSchema>;
export type SessionFilters = z.infer<typeof SessionFiltersSchema>;
