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
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Environment variables
const PORT = process.env.PORT || 3000;
const CORE_API_URL = process.env.CORE_API_URL || 'http://localhost:4000';
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:4001';
const CHAT_SERVICE_URL = process.env.CHAT_SERVICE_URL || 'http://localhost:4002';

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests from this IP, please try again later.'
    }
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
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
      core: CORE_API_URL,
      auth: AUTH_SERVICE_URL,
      chat: CHAT_SERVICE_URL
    }
  });
});

// Auth routes (no auth middleware needed)
app.use('/api/v1/auth', createProxyMiddleware({
  target: AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/v1/auth': '/auth'
  },
  onError: (err, req, res) => {
    logger.error('Auth service error:', err);
    res.status(503).json({ 
      error: {
        code: 'SERVICE_UNAVAILABLE',
        message: 'Auth service unavailable'
      }
    });
  }
}));

// Chat routes (conversations and messages)
app.use('/api/v1/conversations', authMiddleware, createProxyMiddleware({
  target: CHAT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/v1/conversations': '/conversations'
  },
  onError: (err, req, res) => {
    logger.error('Chat service error:', err);
    res.status(503).json({ 
      error: {
        code: 'SERVICE_UNAVAILABLE',
        message: 'Chat service unavailable'
      }
    });
  }
}));

app.use('/api/v1/messages', authMiddleware, createProxyMiddleware({
  target: CHAT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/v1/messages': '/messages'
  },
  onError: (err, req, res) => {
    logger.error('Chat service error:', err);
    res.status(503).json({ 
      error: {
        code: 'SERVICE_UNAVAILABLE',
        message: 'Chat service unavailable'
      }
    });
  }
}));

// All other API v1 routes go to Core API
app.use('/api/v1', authMiddleware, createProxyMiddleware({
  target: CORE_API_URL,
  changeOrigin: true,
  onError: (err, req, res) => {
    logger.error('Core API error:', err);
    res.status(503).json({ 
      error: {
        code: 'SERVICE_UNAVAILABLE',
        message: 'Core API service unavailable'
      }
    });
  }
}));

// Error handling
app.use(errorHandler);

// Setup WebSocket
setupWebSocket(io);

// Start server
server.listen(PORT, () => {
  logger.info(`API Gateway running on port ${PORT}`);
  logger.info(`Health check available at http://localhost:${PORT}/health`);
  logger.info(`Core API proxy: ${CORE_API_URL}`);
  logger.info(`Auth service proxy: ${AUTH_SERVICE_URL}`);
  logger.info(`Chat service proxy: ${CHAT_SERVICE_URL}`);
});

export default app; 