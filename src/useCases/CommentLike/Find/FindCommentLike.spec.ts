import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Find CommentLike', () => {
  let userId: string;
  let commentId: string;

  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();

    const user = await knex.select('id').from('users').first();
    userId = user.id;

    const like = await knex
      .select('commentId')
      .from('comment_likes')
      .where({
        userId,
      })
      .first();
    commentId = like.commentId;
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should be able to delete a like', async () => {
    const response = await request(app)
      .get(`/api/comment-likes/${userId}/${commentId}`)
      .send();

    expect(response.status).toBe(200);
  });
});
