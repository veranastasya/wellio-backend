import { mem, Client, Session, Conversation, Message, Insight, Coach } from "./store";

export interface Repo {
  clearAll(): Promise<void>;
  seed(data: {
    coaches: Coach[];
    clients: Client[];
    sessions: Session[];
    conversations: Conversation[];
    messages: Message[];
    insights: Insight[];
  }): Promise<void>;

  listClients(params?: { page?: number; page_size?: number; query?: string }): Promise<{ items: Client[]; total: number }>;
  getClient(id: string): Promise<Client | null>;
  createClient(data: Omit<Client, "id" | "joined_at">): Promise<Client>;
  updateClient(id: string, data: Partial<Omit<Client, "id" | "joined_at">>): Promise<Client | null>;
  getDistinctServices(): Promise<string[]>;
  getDistinctAttentionStatuses(): Promise<string[]>;

  listSessions(params?: { when?: "today" | "upcoming"; limit?: number }): Promise<Session[]>;
  getSession(id: string): Promise<Session | null>;
  createSession(data: Omit<Session, "id">): Promise<Session>;
  updateSession(id: string, data: Partial<Omit<Session, "id">>): Promise<Session | null>;
  joinSession(id: string): Promise<boolean>;

  listConversations(params?: { page?: number; page_size?: number; query?: string }): Promise<{ items: Conversation[]; total: number }>;
  getMessages(conversationId: string, after?: string): Promise<Message[]>;
  createMessage(input: Omit<Message, "id" | "created_at"> & { text: string }): Promise<Message>;

  homeSummary(): Promise<{ clients_total: number; sessions_today: number; unread_messages: number }>;
  listInsights(scope?: "home" | "clients", limit?: number): Promise<Insight[]>;
}

// Memory implementation
export function createMemoryRepo(): Repo {
  return {
    async clearAll() {
      mem.coaches.length = 0;
      mem.clients.length = 0;
      mem.sessions.length = 0;
      mem.conversations.length = 0;
      mem.messages.length = 0;
      mem.insights.length = 0;
    },
    async seed(data) {
      mem.coaches.push(...data.coaches);
      mem.clients.push(...data.clients);
      mem.sessions.push(...data.sessions);
      mem.conversations.push(...data.conversations);
      mem.messages.push(...data.messages);
      mem.insights.push(...data.insights);
    },
    async listClients(params = {}) {
      const page = params.page ?? 1;
      const page_size = params.page_size ?? 10;
      const q = (params.query || "").toLowerCase();
      const filtered = q ? mem.clients.filter(c => c.full_name.toLowerCase().includes(q)) : mem.clients;
      const start = (page - 1) * page_size;
      return { items: filtered.slice(start, start + page_size), total: filtered.length };
    },
    async getClient(id) {
      return mem.clients.find(c => c.id === id) ?? null;
    },
    async createClient(data) {
      const newClient: Client = {
        id: `c_${Math.random().toString(36).slice(2)}`,
        ...data,
        joined_at: new Date().toISOString()
      };
      mem.clients.push(newClient);
      return newClient;
    },
    async updateClient(id, data) {
      const index = mem.clients.findIndex(c => c.id === id);
      if (index === -1) return null;
      mem.clients[index] = { ...mem.clients[index], ...data };
      return mem.clients[index];
    },
    async getDistinctServices() {
      const services = new Set<string>();
      mem.clients.forEach(client => {
        client.services.forEach(service => services.add(service));
      });
      return Array.from(services);
    },
    async getDistinctAttentionStatuses() {
      const statuses = new Set<string>();
      mem.clients.forEach(client => {
        statuses.add(client.attention_status);
      });
      return Array.from(statuses);
    },
    async listSessions(params = {}) {
      const now = new Date();
      const todayISO = now.toISOString().slice(0, 10);
      let list = mem.sessions;
      if (params.when === "today") {
        list = list.filter(s => s.start_at.slice(0,10) === todayISO);
      }
      if (params.limit) list = list.slice(0, params.limit);
      return list;
    },
    async getSession(id) {
      return mem.sessions.find(s => s.id === id) ?? null;
    },
    async createSession(data) {
      const newSession: Session = {
        id: `s_${Math.random().toString(36).slice(2)}`,
        ...data
      };
      mem.sessions.push(newSession);
      return newSession;
    },
    async updateSession(id, data) {
      const index = mem.sessions.findIndex(s => s.id === id);
      if (index === -1) return null;
      mem.sessions[index] = { ...mem.sessions[index], ...data };
      return mem.sessions[index];
    },
    async joinSession(id) {
      const s = mem.sessions.find(s => s.id === id);
      if (!s) return false;
      s.status = "completed";
      return true;
    },
    async listConversations(params = {}) {
      const page = params.page ?? 1;
      const page_size = params.page_size ?? 10;
      const start = (page - 1) * page_size;
      return { items: mem.conversations.slice(start, start + page_size), total: mem.conversations.length };
    },
    async getMessages(conversationId, after) {
      let msgs = mem.messages.filter(m => m.conversation_id === conversationId);
      if (after) msgs = msgs.filter(m => m.created_at > after);
      return msgs;
    },
    async createMessage(input) {
      const now = new Date().toISOString();
      const msg: Message = {
        id: `msg_${Math.random().toString(36).slice(2)}`,
        conversation_id: input.conversation_id,
        client_id: input.client_id,
        sender: input.sender,
        text: input.text,
        created_at: now
      };
      mem.messages.push(msg);
      const conv = mem.conversations.find(c => c.id === input.conversation_id);
      if (conv) {
        conv.last_message_at = now;
        if (input.sender === "client") conv.unread_count += 1;
      }
      return msg;
    },
    async homeSummary() {
      const today = await this.listSessions({ when: "today" });
      const unread = mem.conversations.reduce((acc, c) => acc + c.unread_count, 0);
      return { clients_total: mem.clients.length, sessions_today: today.length, unread_messages: unread };
    },
    async listInsights(_scope = "home", limit = 5) {
      return mem.insights.slice(0, limit);
    }
  };
}

// Factory that will later return Prisma repo when CORE_DATA_MODE=db
export async function getRepo(): Promise<Repo> {
  const mode = (process.env.CORE_DATA_MODE || "memory").toLowerCase();
  if (mode === "db") {
    // TODO: implement PrismaRepo later; for now, fall back to memory with a console warn
    console.warn("[core] CORE_DATA_MODE=db requested, but Prisma repo not implemented yet. Using memory.");
  }
  return createMemoryRepo();
}
