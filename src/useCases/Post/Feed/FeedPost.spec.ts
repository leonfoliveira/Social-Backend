import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Feed Post', () => {
  let authorization: string;

  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();

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

  it('Should be able to get the index of feed posts from page 1', async () => {
    const response = await request(app)
      .get('/api/posts/feed')
      .send()
      .set('authorization', authorization);

    expect(response.status).toBe(200);
  });
});
