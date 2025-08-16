import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { logger } from './utils/logger';
import { authMiddleware } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';
import { validateRequest } from './middleware/validation';
import { setupWebSocket } from './websocket';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Environment variables
const PORT = process.env.PORT || 3000;
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:4001';
const CHAT_SERVICE_URL = process.env.CHAT_SERVICE_URL || 'http://localhost:4002';
const ANALYTICS_SERVICE_URL = process.env.ANALYTICS_SERVICE_URL || 'http://localhost:4003';
const NOTIFICATIONS_SERVICE_URL = process.env.NOTIFICATIONS_SERVICE_URL || 'http://localhost:4004';
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8001';

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(compression());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    services: {
      auth: AUTH_SERVICE_URL,
      chat: CHAT_SERVICE_URL,
      analytics: ANALYTICS_SERVICE_URL,
      notifications: NOTIFICATIONS_SERVICE_URL,
      ai: AI_SERVICE_URL
    }
  });
});

// API Routes with service proxying
app.use('/api/auth', createProxyMiddleware({
  target: AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/auth': '/auth'
  },
  onError: (err, req, res) => {
    logger.error('Auth service error:', err);
    res.status(503).json({ error: 'Auth service unavailable' });
  }
}));

app.use('/api/chat', authMiddleware, createProxyMiddleware({
  target: CHAT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/chat': '/chat'
  },
  onError: (err, req, res) => {
    logger.error('Chat service error:', err);
    res.status(503).json({ error: 'Chat service unavailable' });
  }
}));

app.use('/api/analytics', authMiddleware, createProxyMiddleware({
  target: ANALYTICS_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/analytics': '/analytics'
  },
  onError: (err, req, res) => {
    logger.error('Analytics service error:', err);
    res.status(503).json({ error: 'Analytics service unavailable' });
  }
}));

app.use('/api/notifications', authMiddleware, createProxyMiddleware({
  target: NOTIFICATIONS_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/notifications': '/notifications'
  },
  onError: (err, req, res) => {
    logger.error('Notifications service error:', err);
    res.status(503).json({ error: 'Notifications service unavailable' });
  }
}));

app.use('/api/ai', authMiddleware, createProxyMiddleware({
  target: AI_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/ai': '/ai'
  },
  onError: (err, req, res) => {
    logger.error('AI service error:', err);
    res.status(503).json({ error: 'AI service unavailable' });
  }
}));

// Unified API endpoints for frontend integration
app.get('/api/dashboard', authMiddleware, async (req, res) => {
  try {
    // Aggregate data from multiple services
    const [sessions, clients, messages, insights] = await Promise.all([
      fetch(`${ANALYTICS_SERVICE_URL}/analytics/sessions?coachId=${req.user.id}`),
      fetch(`${ANALYTICS_SERVICE_URL}/analytics/clients?coachId=${req.user.id}`),
      fetch(`${CHAT_SERVICE_URL}/chat/conversations?coachId=${req.user.id}&unread=true`),
      fetch(`${ANALYTICS_SERVICE_URL}/analytics/insights?coachId=${req.user.id}`)
    ]);

    const dashboardData = {
      sessions: await sessions.json(),
      clients: await clients.json(),
      messages: await messages.json(),
      insights: await insights.json()
    };

    res.json({ success: true, data: dashboardData });
  } catch (error) {
    logger.error('Dashboard aggregation error:', error);
    res.status(500).json({ error: 'Failed to load dashboard data' });
  }
});

// Error handling
app.use(errorHandler);

// Setup WebSocket
setupWebSocket(io);

// Start server
server.listen(PORT, () => {
  logger.info(`API Gateway running on port ${PORT}`);
  logger.info(`Health check available at http://localhost:${PORT}/health`);
});

export default app; 