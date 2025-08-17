export type AttentionStatus = 'on_track' | 'needs_attention';
export type SessionStatus = 'scheduled' | 'completed' | 'canceled';
export type MessageSender = 'coach' | 'client';
export type InsightType = 'retention_opportunity' | 'progress_trend' | 'client_insight';
export type ImportSource = 'manual' | 'mfp' | 'fatsecret';
export type ImportStatus = 'pending' | 'processing' | 'done' | 'failed';
export type NotificationType = 'message' | 'session' | 'reminder' | 'insight' | 'system';

export interface PaginationParams {
  page?: number;
  page_size?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
    has_next: boolean;
  };
}

export interface SearchFilters {
  query?: string;
  status?: string;
  date_from?: string;
  date_to?: string;
  type?: string;
}
