-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('coach', 'client')),
  avatar VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create coaches table (extends users)
CREATE TABLE IF NOT EXISTS coaches (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  specialization VARCHAR(255),
  experience INTEGER,
  bio TEXT,
  hourly_rate DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create clients table (extends users)
CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  coach_id INTEGER REFERENCES coaches(id),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('active', 'inactive', 'pending')),
  health_metrics JSONB,
  goals JSONB,
  program JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  coach_id INTEGER REFERENCES coaches(id),
  client_id INTEGER REFERENCES clients(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  type VARCHAR(50) DEFAULT 'consultation' CHECK (type IN ('consultation', 'training', 'nutrition', 'assessment')),
  notes TEXT,
  video_link VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id SERIAL PRIMARY KEY,
  coach_id INTEGER REFERENCES coaches(id),
  client_id INTEGER REFERENCES clients(id),
  last_message_id INTEGER,
  unread_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id INTEGER REFERENCES users(id),
  sender_type VARCHAR(50) NOT NULL CHECK (sender_type IN ('coach', 'client')),
  content TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'text' CHECK (type IN ('text', 'image', 'file', 'questionnaire', 'reminder')),
  attachments JSONB,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create questionnaires table
CREATE TABLE IF NOT EXISTS questionnaires (
  id SERIAL PRIMARY KEY,
  coach_id INTEGER REFERENCES coaches(id),
  client_id INTEGER REFERENCES clients(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  questions JSONB NOT NULL,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'completed', 'expired')),
  sent_at TIMESTAMP,
  completed_at TIMESTAMP,
  responses JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id SERIAL PRIMARY KEY,
  coach_id INTEGER REFERENCES coaches(id),
  type VARCHAR(50) NOT NULL CHECK (type IN ('retention', 'revenue', 'engagement', 'performance')),
  data JSONB NOT NULL,
  period VARCHAR(50) NOT NULL CHECK (period IN ('daily', 'weekly', 'monthly', 'yearly')),
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create insights table
CREATE TABLE IF NOT EXISTS insights (
  id SERIAL PRIMARY KEY,
  coach_id INTEGER REFERENCES coaches(id),
  type VARCHAR(50) NOT NULL CHECK (type IN ('churn_risk', 'opportunity', 'trend', 'recommendation')),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('message', 'session', 'reminder', 'insight', 'system')),
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_clients_coach_id ON clients(coach_id);
CREATE INDEX IF NOT EXISTS idx_sessions_coach_id ON sessions(coach_id);
CREATE INDEX IF NOT EXISTS idx_sessions_client_id ON sessions(client_id);
CREATE INDEX IF NOT EXISTS idx_conversations_coach_id ON conversations(coach_id);
CREATE INDEX IF NOT EXISTS idx_conversations_client_id ON conversations(client_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_analytics_coach_id ON analytics(coach_id);
CREATE INDEX IF NOT EXISTS idx_insights_coach_id ON insights(coach_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id); 