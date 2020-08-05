import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Index Comment', () => {
  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should be able to get the index of comments from page 1', async () => {
    const response = await request(app).get('/api/comments?page=1').send();

    expect(response.status).toBe(200);
  });

  it('Should be able to get the index of comments from page 1 of a specific user', async () => {
    const { id } = await knex.select('id').from('users').first();

    const response = await request(app)
      .get(`/api/comments?page=1&user-id=${id}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('Should be able to get the index of comments from page 1 of a specific post', async () => {
    const { id } = await knex.select('id').from('posts').first();

    const response = await request(app)
      .get(`/api/comments?page=1&post-id=${id}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('Should be able to get the index of comments from page 1 of a specific user and post', async () => {
    const { id: userId } = await knex.select('id').from('users').first();
    const { id: postId } = await knex.select('id').from('posts').first();

    const response = await request(app)
      .get(`/api/comments?page=1&user-id=${userId}&post-id=${postId}`)
      .send();

    expect(response.status).toBe(200);
  });
});
