import { mem, Client, Session, Conversation, Message, Insight, Coach } from "../data/store";

function iso(d: Date) { return d.toISOString(); }
function addDays(n: number) { const d = new Date(); d.setDate(d.getDate() + n); return d; }

export function buildMemorySeed() {
  const coach: Coach = { id: "coach_demo", email: "test@example.com", name: "Test Coach" };

  const clients: Client[] = [
    { id: "c_1", full_name: "Emma Johnson", email: "emma@example.com", services: ["Nutrition"], attention_status: "on_track", joined_at: iso(addDays(-30)), next_session_at: iso(addDays(0)) },
    { id: "c_2", full_name: "Liam Brown", email: "liam@example.com", services: ["Strength"], attention_status: "needs_attention", joined_at: iso(addDays(-12)) },
    { id: "c_3", full_name: "Olivia Davis", email: "olivia@example.com", services: ["Wellness"], attention_status: "on_track", joined_at: iso(addDays(-5)) },
    { id: "c_4", full_name: "Noah Miller", email: "noah@example.com", services: ["Cardio"], attention_status: "on_track", joined_at: iso(addDays(-60)) },
    { id: "c_5", full_name: "Ava Wilson", email: "ava@example.com", services: ["Mobility"], attention_status: "needs_attention", joined_at: iso(addDays(-2)) }
  ];

  const sessions: Session[] = [
    { id: "s_1", client_id: "c_1", service: "Nutrition", start_at: iso(addDays(0)), duration_min: 30, status: "scheduled", join_url: "https://meet.example.com/s_1" },
    { id: "s_2", client_id: "c_2", service: "Strength",  start_at: iso(addDays(1)), duration_min: 45, status: "scheduled", join_url: "https://meet.example.com/s_2" },
    { id: "s_3", client_id: "c_3", service: "Wellness",  start_at: iso(addDays(-1)), duration_min: 30, status: "completed" }
  ];

  const conversations: Conversation[] = [
    { id: "cv_1", client_id: "c_1", last_message_at: iso(addDays(-0.2)), unread_count: 1 },
    { id: "cv_2", client_id: "c_2", last_message_at: iso(addDays(-1)), unread_count: 0 }
  ];

  const messages: Message[] = [
    { id: "m_1", conversation_id: "cv_1", client_id: "c_1", sender: "client", text: "Hi! Could we reschedule?", created_at: iso(addDays(-0.3)) },
    { id: "m_2", conversation_id: "cv_1", client_id: "c_1", sender: "coach",  text: "Sure, let's find a time.", created_at: iso(addDays(-0.25)) },
    { id: "m_3", conversation_id: "cv_2", client_id: "c_2", sender: "coach",  text: "How's your plan going?",   created_at: iso(addDays(-1)) }
  ];

  const insights: Insight[] = [
    { id: "i_1", type: "retention_opportunity", payload: { client_id: "c_2", reason: "Low engagement last 7d" }, created_at: iso(addDays(-0.5)) },
    { id: "i_2", type: "client_insight",        payload: { client_id: "c_1", note: "Hit protein target 5/7" },  created_at: iso(addDays(-2)) }
  ];

  return { coach, clients, sessions, conversations, messages, insights };
}
