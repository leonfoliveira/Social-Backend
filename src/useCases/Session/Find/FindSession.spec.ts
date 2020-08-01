import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Find session', () => {
  let authorization: string;

  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run({
      specific: '001_users.ts',
    });

    const response = await request(app).post('/api/sessions').send({
      email: 'person.a@mail.com',
      password: '12345678',
    });
    authorization = `Bearer ${response.body.token}`;
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('should NOT be able find the session without authentication', async () => {
    const response = await request(app).get('/api/sessions').send();

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"authorization" is required');
  });

  it('should be able to find the session', async () => {
    const response = await request(app)
      .get('/api/sessions')
      .send()
      .set('authorization', authorization);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe('person.a@mail.com');
    expect(response.body.name).toBe('Person A');
    expect(response.body.tag).toBe('persona');
  });
});
