import request from 'supertest';
import app from '../../index';

describe('Clients Module', () => {
  describe('GET /api/v1/clients', () => {
    it('should return clients list with pagination', async () => {
      const response = await request(app)
        .get('/api/v1/clients')
        .set('Authorization', 'Bearer test-token')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('pagination');
      expect(Array.isArray(response.body.data.data)).toBe(true);
    });

    it('should filter clients by query', async () => {
      const response = await request(app)
        .get('/api/v1/clients?query=emma')
        .set('Authorization', 'Bearer test-token')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.data.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/v1/clients/facets', () => {
    it('should return client facets', async () => {
      const response = await request(app)
        .get('/api/v1/clients/facets')
        .set('Authorization', 'Bearer test-token')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('services');
      expect(response.body.data).toHaveProperty('statuses');
    });
  });
});
