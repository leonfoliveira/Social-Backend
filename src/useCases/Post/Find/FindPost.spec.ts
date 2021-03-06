import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Find Post', () => {
  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should be able to find a post by id', async () => {
    const { id } = await knex
      .select('id')
      .from('posts')
      .where({ deletedAt: null })
      .first();

    const response = await request(app).get(`/api/posts/${id}`).send();

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(id);
  });

  it('Should NOT be able to find a user by id unexistent', async () => {
    const response = await request(app).get(`/api/posts/unexistent-id`).send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('post not found');
  });
});
