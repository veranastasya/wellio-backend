import { z } from 'zod';

// Home module schemas
export const HomeSummarySchema = z.object({
  total_clients: z.number(),
  active_sessions: z.number(),
  unread_messages: z.number(),
  pending_tasks: z.number(),
});

export const SessionJoinSchema = z.object({
  session_id: z.string().uuid(),
});

// Analytics schemas
export const AnalyticsSummarySchema = z.object({
  range: z.enum(['this_week', 'this_month', 'this_quarter', 'this_year']),
});

export const ChurnPredictionSchema = z.object({
  limit: z.number().min(1).max(50).default(5),
});

export const RevenueForecastSchema = z.object({
  range: z.string().regex(/^\d+[dwmy]$/, 'Invalid range format (e.g., 6m, 30d)'),
});

export const AnalyticsExportSchema = z.object({
  range: z.string(),
  format: z.enum(['csv', 'json', 'xlsx']).default('csv'),
});

// Upload schemas
export const UploadResponseSchema = z.object({
  file_id: z.string().uuid(),
  filename: z.string(),
  size: z.number(),
  url: z.string().url(),
});

// Search schemas
export const SearchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  type: z.enum(['clients', 'conversations', 'sessions']).optional(),
  limit: z.number().min(1).max(100).default(10),
});

// Integration schemas
export const IntegrationConnectSchema = z.object({
  client_id: z.string().uuid(),
  access_token: z.string(),
  refresh_token: z.string().optional(),
});

export const DataImportSchema = z.object({
  client_id: z.string().uuid(),
  type: z.enum(['manual', 'mfp', 'fatsecret']),
  file_id: z.string().uuid(),
});

// Message template schemas
export const MessageTemplateSchema = z.object({
  client_id: z.string().uuid(),
  template_id: z.string().uuid(),
  variables: z.record(z.string()).optional(),
});

// Onboarding schemas
export const QuestionnaireSendSchema = z.object({
  client_id: z.string().uuid(),
  questionnaire_id: z.string().uuid(),
});

export type HomeSummary = z.infer<typeof HomeSummarySchema>;
export type SessionJoin = z.infer<typeof SessionJoinSchema>;
export type AnalyticsSummary = z.infer<typeof AnalyticsSummarySchema>;
export type ChurnPrediction = z.infer<typeof ChurnPredictionSchema>;
export type RevenueForecast = z.infer<typeof RevenueForecastSchema>;
export type AnalyticsExport = z.infer<typeof AnalyticsExportSchema>;
export type UploadResponse = z.infer<typeof UploadResponseSchema>;
export type Search = z.infer<typeof SearchSchema>;
export type IntegrationConnect = z.infer<typeof IntegrationConnectSchema>;
export type DataImport = z.infer<typeof DataImportSchema>;
export type MessageTemplate = z.infer<typeof MessageTemplateSchema>;
export type QuestionnaireSend = z.infer<typeof QuestionnaireSendSchema>;
