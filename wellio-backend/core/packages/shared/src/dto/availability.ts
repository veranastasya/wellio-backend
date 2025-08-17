import { z } from 'zod';

export const AvailabilitySchema = z.object({
  id: z.string().uuid(),
  coach_id: z.string().uuid(),
  weekday: z.number().min(0).max(6), // 0 = Sunday, 6 = Saturday
  start_time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  end_time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
});

export const CreateAvailabilitySchema = AvailabilitySchema.omit({ id: true });

export type Availability = z.infer<typeof AvailabilitySchema>;
export type CreateAvailability = z.infer<typeof CreateAvailabilitySchema>;
