export type Id = string;

export interface Coach {
  id: Id;
  email: string;
  name: string;
}

export interface Client {
  id: Id;
  full_name: string;
  email?: string;
  phone?: string;
  services: string[];
  attention_status: "on_track" | "needs_attention";
  joined_at: string;       // ISO
  next_session_at?: string;
  tags?: Record<string, unknown>;
}

export interface Session {
  id: Id;
  client_id: Id;
  service: string;
  start_at: string;        // ISO
  duration_min: number;
  status: "scheduled" | "completed" | "canceled";
  join_url?: string;
}

export interface Conversation {
  id: Id;
  client_id: Id;
  last_message_at: string;
  unread_count: number;
}

export interface Message {
  id: Id;
  conversation_id: Id;
  client_id: Id;
  sender: "coach" | "client";
  text: string;
  created_at: string;      // ISO
}

export interface Insight {
  id: Id;
  type: "retention_opportunity" | "progress_trend" | "client_insight";
  payload: Record<string, unknown>;
  created_at: string;      // ISO
}

export const mem = {
  coaches: [] as Coach[],
  clients: [] as Client[],
  sessions: [] as Session[],
  conversations: [] as Conversation[],
  messages: [] as Message[],
  insights: [] as Insight[],
};
