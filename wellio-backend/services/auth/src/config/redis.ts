import Redis from 'redis';
import { logger } from '../utils/logger';

const client = Redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('connect', () => {
  logger.info('Connected to Redis');
});

client.on('error', (err) => {
  logger.error('Redis Client Error', err);
});

client.connect().catch((err) => {
  logger.error('Failed to connect to Redis', err);
});

export default client; 