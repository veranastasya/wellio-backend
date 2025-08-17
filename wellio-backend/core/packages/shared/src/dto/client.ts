import { z } from 'zod';
import { AttentionStatus } from '../common/types';

export const ClientSchema = z.object({
  id: z.string().uuid(),
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
  services: z.array(z.string()).default([]),
  attention_status: z.enum(['on_track', 'needs_attention']).default('on_track'),
  joined_at: z.string().datetime(),
  next_session_at: z.string().datetime().nullable(),
  tags: z.record(z.any()).default({}),
});

export const CreateClientSchema = ClientSchema.omit({ 
  id: true, 
  joined_at: true, 
  next_session_at: true 
});

export const UpdateClientSchema = CreateClientSchema.partial();

export const ClientFiltersSchema = z.object({
  status: z.string().optional(),
  service: z.string().optional(),
  query: z.string().optional(),
  sort: z.string().optional(),
  page: z.number().min(1).default(1),
  page_size: z.number().min(1).max(100).default(20),
});

export type Client = z.infer<typeof ClientSchema>;
export type CreateClient = z.infer<typeof CreateClientSchema>;
export type UpdateClient = z.infer<typeof UpdateClientSchema>;
export type ClientFilters = z.infer<typeof ClientFiltersSchema>;
