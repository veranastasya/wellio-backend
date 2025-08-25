import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import listEndpoints from 'express-list-endpoints';
import authRoutes from './routes/auth';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import pool from './config/database';
import { getCache, closeCache } from './lib/cache';

const app = express();
const PORT = process.env.PORT || 4001;

// One-liner logger for debugging
app.use((req, _res, next) => { console.log(`[auth] ${req.method} ${req.url}`); next(); });

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
    service: 'Auth Service',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/v1/auth', authRoutes);

// Error handling
app.use(errorHandler);

// Start server
async function main() {
  try {
    // Ensure cache is ready (Redis or Memory)
    await getCache();
    
    const server = app.listen(PORT, () => {
      logger.info(`Auth Service running on port ${PORT}`);
      logger.info(`Health check available at http://localhost:${PORT}/health`);
      
      // Print all available endpoints
      console.log('\n=== Auth Service Endpoints ===');
      const endpoints = listEndpoints(app);
      endpoints.forEach(endpoint => {
        endpoint.methods.forEach(method => {
          console.log(`${method.toUpperCase()} ${endpoint.path}`);
        });
      });
      console.log('==============================\n');
    });

    // Graceful shutdown
    const shutdown = async () => {
      server.close();
      await closeCache();
      process.exit(0);
    };
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    logger.error('Failed to start Auth Service:', error);
    process.exit(1);
  }
}

main().catch((err) => {
  logger.error("[auth] fatal:", err);
  process.exit(1);
});

export default app; 