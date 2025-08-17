import { z } from 'zod';
import { InsightType } from '../common/types';

export const InsightSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['retention_opportunity', 'progress_trend', 'client_insight']),
  payload: z.record(z.any()),
  created_at: z.string().datetime(),
});

export const InsightFiltersSchema = z.object({
  scope: z.string().optional(),
  type: z.string().optional(),
  limit: z.number().min(1).max(100).default(10),
});

export type Insight = z.infer<typeof InsightSchema>;
export type InsightFilters = z.infer<typeof InsightFiltersSchema>;
