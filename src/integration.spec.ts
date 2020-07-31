import request from 'supertest';
import app from './app';
import server from './server';

describe('Integration', () => {
  it('Should be able to connect to server', async () => {
    const response = await request(app).get('/api/ping');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('pong');
  });

  it('Should be able to start and close the server', async () => {
    expect(server.listening).toBe(true);

    server.close();
  });
});
