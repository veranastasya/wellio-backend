import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4003;

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('combined'));
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Analytics Service',
    timestamp: new Date().toISOString()
  });
});

// Analytics routes (placeholder)
app.get('/analytics/clients', (_req, res) => {
  res.json({
    success: true,
    data: {
      clients: []
    }
  });
});

app.get('/analytics/sessions', (_req, res) => {
  res.json({
    success: true,
    data: {
      sessions: []
    }
  });
});

app.listen(PORT, () => {
  console.log(`Analytics Service running on port ${PORT}`);
});

export default app; 