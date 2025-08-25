import request from 'supertest';
import app from '../index';

describe('Auth ↔ Core JWT Integration', () => {
  let accessToken: string;

  beforeAll(async () => {
    // Get access token from Auth service
    const authResponse = await request('http://localhost:4001')
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })
      .expect(200);

    accessToken = authResponse.body.data.access_token;
    expect(accessToken).toBeDefined();
  });

  describe('GET /api/v1/me', () => {
    it('should return user info with valid token', async () => {
      const response = await request(app)
        .get('/api/v1/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({
        id: 'dev-user-id',
        email: 'test@example.com',
        role: 'user'
      });
    });

    it('should return 401 without token', async () => {
      await request(app)
        .get('/api/v1/me')
        .expect(401)
        .expect((res) => {
          expect(res.body.error.code).toBe('NO_TOKEN');
        });
    });

    it('should return 401 with invalid token', async () => {
      await request(app)
        .get('/api/v1/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401)
        .expect((res) => {
          expect(res.body.error.code).toBe('INVALID_TOKEN');
        });
    });
  });

  describe('GET /api/v1/home/summary', () => {
    it('should work with valid token', async () => {
      const response = await request(app)
        .get('/api/v1/home/summary')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
    });
  });
});
