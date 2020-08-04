import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Index Post', () => {
  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should be able to get the index of posts from page 1', async () => {
    const response = await request(app).get('/api/posts/trend').send();

    expect(response.status).toBe(200);
  });
});
