import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Find PostLike', () => {
  let userId: string;
  let postId: string;

  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();

    const user = await knex.select('id').from('users').first();
    userId = user.id;

    const like = await knex
      .select('postId')
      .from('post_likes')
      .where({
        userId,
      })
      .first();
    postId = like.postId;
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should be able to delete a like', async () => {
    const response = await request(app)
      .get(`/api/post-likes/${userId}/${postId}`)
      .send();

    expect(response.status).toBe(200);
  });
});
