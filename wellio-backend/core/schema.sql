-- Create core database
CREATE DATABASE IF NOT EXISTS wellio_core;

-- Connect to core database
\c wellio_core;

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  services TEXT[] DEFAULT '{}',
  attention_status VARCHAR(50) DEFAULT 'on_track' CHECK (attention_status IN ('on_track', 'needs_attention')),
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  next_session_at TIMESTAMP,
  tags JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  service VARCHAR(100) NOT NULL,
  start_at TIMESTAMP NOT NULL,
  duration_min INTEGER NOT NULL CHECK (duration_min > 0),
  status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'canceled')),
  join_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  sender VARCHAR(50) NOT NULL CHECK (sender IN ('coach', 'client')),
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  last_message_at TIMESTAMP,
  unread_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create insights table
CREATE TABLE IF NOT EXISTS insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL CHECK (type IN ('retention_opportunity', 'progress_trend', 'client_insight')),
  payload JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create availability table
CREATE TABLE IF NOT EXISTS availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL,
  weekday INTEGER NOT NULL CHECK (weekday >= 0 AND weekday <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('message', 'session', 'reminder', 'insight', 'system')),
  payload JSONB NOT NULL,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create import_jobs table
CREATE TABLE IF NOT EXISTS import_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  source VARCHAR(50) NOT NULL CHECK (source IN ('manual', 'mfp', 'fatsecret')),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'done', 'failed')),
  file_id UUID,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_attention_status ON clients(attention_status);
CREATE INDEX IF NOT EXISTS idx_sessions_client_id ON sessions(client_id);
CREATE INDEX IF NOT EXISTS idx_sessions_start_at ON sessions(start_at);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_client_id ON messages(client_id);
CREATE INDEX IF NOT EXISTS idx_conversations_client_id ON conversations(client_id);
CREATE INDEX IF NOT EXISTS idx_insights_type ON insights(type);
CREATE INDEX IF NOT EXISTS idx_insights_created_at ON insights(created_at);
CREATE INDEX IF NOT EXISTS idx_availability_coach_id ON availability(coach_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read_at ON notifications(read_at);
CREATE INDEX IF NOT EXISTS idx_import_jobs_client_id ON import_jobs(client_id);
CREATE INDEX IF NOT EXISTS idx_import_jobs_status ON import_jobs(status);

-- Insert sample data
INSERT INTO clients (id, full_name, email, phone, services, attention_status, joined_at, next_session_at, tags) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Emma Johnson', 'emma.johnson@email.com', '+1-555-0123', ARRAY['nutrition', 'fitness'], 'on_track', '2024-01-15T10:00:00Z', '2024-02-01T14:00:00Z', '{"priority": "high", "goals": ["weight_loss"]}'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Michael Chen', 'michael.chen@email.com', '+1-555-0124', ARRAY['fitness'], 'needs_attention', '2024-01-10T09:00:00Z', NULL, '{"priority": "medium", "goals": ["muscle_gain"]}'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Sarah Williams', 'sarah.williams@email.com', '+1-555-0125', ARRAY['nutrition', 'wellness'], 'on_track', '2024-01-20T11:00:00Z', '2024-01-30T16:00:00Z', '{"priority": "low", "goals": ["general_health"]}')
ON CONFLICT (id) DO NOTHING;

INSERT INTO sessions (id, client_id, service, start_at, duration_min, status, join_url) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'nutrition', '2024-02-01T14:00:00Z', 60, 'scheduled', 'https://meet.google.com/abc-defg-hij'),
  ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'fitness', '2024-01-30T10:00:00Z', 45, 'completed', NULL),
  ('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'wellness', '2024-01-30T16:00:00Z', 30, 'scheduled', 'https://meet.google.com/xyz-uvw-rst')
ON CONFLICT (id) DO NOTHING;

INSERT INTO conversations (id, client_id, last_message_at, unread_count) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '2024-01-25T10:00:00Z', 2),
  ('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', '2024-01-24T14:30:00Z', 0),
  ('770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', '2024-01-23T16:00:00Z', 1')
ON CONFLICT (id) DO NOTHING;

INSERT INTO messages (id, conversation_id, client_id, sender, text, created_at) VALUES
  ('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'client', 'How is the new diet plan working?', '2024-01-25T10:00:00Z'),
  ('880e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'coach', 'Great! I can see you\'ve been consistent with the meal prep.', '2024-01-25T11:00:00Z'),
  ('880e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'coach', 'Don\'t forget about our session tomorrow!', '2024-01-24T14:30:00Z')
ON CONFLICT (id) DO NOTHING;

INSERT INTO insights (id, type, payload, created_at) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', 'retention_opportunity', '{"client_id": "550e8400-e29b-41d4-a716-446655440002", "risk_score": 0.7, "reason": "Missed multiple sessions"}', '2024-01-25T10:00:00Z'),
  ('990e8400-e29b-41d4-a716-446655440002', 'progress_trend', '{"client_id": "550e8400-e29b-41d4-a716-446655440001", "trend": "improving", "metric": "weight_loss", "change": -2.5}', '2024-01-24T14:30:00Z')
ON CONFLICT (id) DO NOTHING;
