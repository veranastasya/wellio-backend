import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { v4 as uuidv4 } from 'uuid';

// Import modules
import { homeRouter } from './modules/home';
import { clientsRouter } from './modules/clients';
import { sessionsRouter } from './modules/sessions';
import { insightsRouter } from './modules/insights';
import { analyticsRouter } from './modules/analytics';
import { onboardingRouter } from './modules/onboarding';
import { uploadsRouter } from './modules/uploads';
import { integrationsRouter } from './modules/integrations';
import { notificationsRouter } from './modules/notifications';
import { searchRouter } from './modules/search';

// Import common utilities
import { logger } from './common/logger';
import { errorHandler } from './common/errorHandler';
import { requireAuth } from './common/auth';
import { validateRequest } from './common/validation';

interface HealthResponse {
  ok: boolean;
  service: string;
  timestamp: string;
  version: string;
}

const app = express();
const PORT = process.env.PORT || 4000;

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
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true
}));
app.use(compression());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

// Request ID middleware
app.use((req, res, next) => {
  req.id = uuidv4();
  res.setHeader('X-Request-ID', req.id);
  next();
});

// Health check
app.get('/health', (req, res) => {
  const response: HealthResponse = {
    ok: true,
    service: 'Core API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  };
  res.json(response);
});

// Protected API v1 routes
app.use('/api/v1', requireAuth);

// API v1 routes
app.use('/api/v1/home', homeRouter);
app.use('/api/v1/clients', clientsRouter);
app.use('/api/v1/sessions', sessionsRouter);
app.use('/api/v1/insights', insightsRouter);
app.use('/api/v1/analytics', analyticsRouter);
app.use('/api/v1/onboarding', onboardingRouter);
app.use('/api/v1/uploads', uploadsRouter);
app.use('/api/v1/integrations', integrationsRouter);
app.use('/api/v1/notifications', notificationsRouter);
app.use('/api/v1/search', searchRouter);

// User profile routes
app.get('/api/v1/me', (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role
    }
  });
});

app.patch('/api/v1/me', validateRequest, (req, res) => {
  // TODO: Implement user profile update
  res.json({
    success: true,
    message: 'Profile updated successfully'
  });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.originalUrl} not found`
    }
  });
});

// Start server
async function startServer() {
  try {
    // Seed data on startup
    const { getRepo } = await import('./data/repo');
    const { buildMemorySeed } = await import('./seed/memorySeed');
    
    const repo = await getRepo();
    await repo.clearAll();
    
    const data = buildMemorySeed();
    await repo.seed({
      coaches: [data.coach],
      clients: data.clients,
      sessions: data.sessions,
      conversations: data.conversations,
      messages: data.messages,
      insights: data.insights
    });
    
    console.log('[core] Seeded with demo data');
    
    app.listen(PORT, () => {
      logger.info(`Core API running on port ${PORT}`);
      logger.info(`Health check available at http://localhost:${PORT}/health`);
      
      // Log JWT configuration
      console.log('[core] JWT cfg', {
        iss: process.env.AUTH_ISSUER,
        aud: process.env.AUTH_AUDIENCE,
        hasSecret: !!process.env.JWT_SECRET
      });
    });
  } catch (error) {
    logger.error('Failed to start Core API:', error);
    process.exit(1);
  }
}

startServer();

export default app;
