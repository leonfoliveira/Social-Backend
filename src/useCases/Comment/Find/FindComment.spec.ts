import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Find Comment', () => {
  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should be able to find a comment by id', async () => {
    const { id } = await knex.select('id').from('comments').first();

    const response = await request(app).get(`/api/comments/${id}`).send();

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(id);
  });

  it('Should NOT be able to find a comment by id unexistent', async () => {
    const response = await request(app)
      .get(`/api/comments/unexistent-id`)
      .send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('comment not found');
  });
});
