export type AttentionStatus = "on_track" | "needs_attention";

export interface ClientDTO {
  id: string;
  full_name: string;
  email?: string;
  phone?: string;
  services: string[];
  attention_status: AttentionStatus;
  joined_at: string;        // ISO
  next_session_at?: string; // ISO
  tags?: Record<string, unknown>;
}
