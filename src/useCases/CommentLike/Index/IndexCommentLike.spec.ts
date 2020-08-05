import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Index CommentLike', () => {
  let userId: string;
  let commentId: string;

  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();

    const user = await knex.select('id').from('users').first();
    userId = user.id;

    const post = await knex.select('id').from('comments').first();
    commentId = post.id;
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should be able to get the index of likes', async () => {
    const response = await request(app).get(`/api/comment-likes`).send();

    expect(response.status).toBe(200);
  });

  it('Should be able to get the index of likes by user', async () => {
    const response = await request(app)
      .get(`/api/comment-likes?user-id=${userId}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('Should be able to get the index of likes by comment', async () => {
    const response = await request(app)
      .get(`/api/comment-likes?comment-id=${commentId}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('Should NOT be able to get the index of likes by user and comment', async () => {
    const response = await request(app)
      .get(`/api/comment-likes?user-id=${userId}&comment-id=${commentId}`)
      .send();

    expect(response.status).toBe(400);
  });
});
