// Test setup file
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Mock JWT verification for tests
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(() => ({
    id: 'test-user-id',
    email: 'test@example.com',
    name: 'Test User',
    role: 'coach'
  }))
}));

// Global test timeout
jest.setTimeout(10000);
