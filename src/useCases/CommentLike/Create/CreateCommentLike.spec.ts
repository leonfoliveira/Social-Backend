import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Create CommentLike', () => {
  let authorization: string;
  let userId: string;
  let commentId: string;

  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();

    const response = await request(app).post('/api/sessions').send({
      email: 'person.a@mail.com',
      password: '12345678',
    });
    authorization = `Bearer ${response.body.token}`;
    userId = response.body.user.id;

    const comment = await knex
      .select('id')
      .from('comments')
      .whereNotIn('id', function () {
        this.select('commentId').from('comment_likes').where({ userId });
      })
      .first();
    commentId = comment.id;
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should be able to create a new like', async () => {
    const response = await request(app)
      .post('/api/comment-likes')
      .send({
        commentId,
      })
      .set('authorization', authorization);

    expect(response.status).toBe(201);
  });
});
