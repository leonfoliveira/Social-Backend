import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Index PostLike', () => {
  let userId: string;
  let postId: string;

  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();

    const user = await knex.select('id').from('users').first();
    userId = user.id;

    const post = await knex.select('id').from('posts').first();
    postId = post.id;
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should be able to get the index of likes', async () => {
    const response = await request(app).get(`/api/post-likes`).send();

    expect(response.status).toBe(200);
  });

  it('Should be able to get the index of likes by user', async () => {
    const response = await request(app)
      .get(`/api/post-likes?user-id=${userId}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('Should be able to get the index of likes by post', async () => {
    const response = await request(app)
      .get(`/api/post-likes?post-id=${postId}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('Should NOT be able to get the index of likes by user and post', async () => {
    const response = await request(app)
      .get(`/api/post-likes?user-id=${userId}&post-id=${postId}`)
      .send();

    expect(response.status).toBe(400);
  });
});
