import request from 'supertest';
import app from './app';

describe('Integration', () => {
  it('Should be able to connect to server', async () => {
    const response = await request(app).get('/api/ping');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('pong');
  });
});
