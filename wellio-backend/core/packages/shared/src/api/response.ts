export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface HealthResponse {
  ok: boolean;
  service: string;
  timestamp: string;
  version?: string;
}
