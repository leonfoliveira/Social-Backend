import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Create PostLike', () => {
  let authorization: string;
  let userId: string;
  let postId: string;

  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();

    const response = await request(app).post('/api/sessions').send({
      email: 'person.a@mail.com',
      password: '12345678',
    });
    authorization = `Bearer ${response.body.token}`;
    userId = response.body.user.id;

    const post = await knex
      .select('id')
      .from('posts')
      .whereNotIn('id', function () {
        this.select('postId').from('post_likes').where({ userId });
      })
      .first();
    postId = post.id;
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should be able to create a new like', async () => {
    const response = await request(app)
      .post('/api/post-likes')
      .send({
        postId,
      })
      .set('authorization', authorization);

    expect(response.status).toBe(201);
  });
});
