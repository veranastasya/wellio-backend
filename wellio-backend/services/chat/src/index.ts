import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';

const app = express();
const PORT = process.env.PORT || 4002;

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
    service: 'Chat Service',
    timestamp: new Date().toISOString()
  });
});

// Chat routes (placeholder)
app.get('/chat/conversations', (req, res) => {
  res.json({
    success: true,
    data: {
      conversations: []
    }
  });
});

app.listen(PORT, () => {
  console.log(`Chat Service running on port ${PORT}`);
});

export default app; 