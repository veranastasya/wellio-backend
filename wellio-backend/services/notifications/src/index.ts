import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4004;

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('combined'));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Notifications Service',
    timestamp: new Date().toISOString()
  });
});

// Notifications routes (placeholder)
app.get('/notifications', (req, res) => {
  res.json({
    success: true,
    data: {
      notifications: []
    }
  });
});

app.listen(PORT, () => {
  console.log(`Notifications Service running on port ${PORT}`);
});

export default app; 