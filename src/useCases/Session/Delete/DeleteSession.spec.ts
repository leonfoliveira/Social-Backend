import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Delete Session', () => {
  let token: string;

  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();

    const response = await request(app).post('/api/sessions').send({
      email: 'person.a@mail.com',
      password: '12345678',
    });
    token = response.body.token;
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('should be able to revoke a token', async () => {
    const response = await request(app)
      .delete(`/api/sessions/${token}`)
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to use the revoked token', async () => {
    const response = await request(app)
      .get('/api/sessions')
      .send()
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('token revoked');
  });
});
