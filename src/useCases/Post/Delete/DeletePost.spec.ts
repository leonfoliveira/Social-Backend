import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Delete Post', () => {
  let id: string;
  let id2: string;
  let authorization: string;

  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();

    const response = await request(app).post('/api/sessions').send({
      email: 'person.a@mail.com',
      password: '12345678',
    });
    authorization = `Bearer ${response.body.token}`;

    const post = await knex
      .select('id')
      .from('posts')
      .where({ authorId: response.body.user.id })
      .first();
    id = post.id;

    const post2 = await knex
      .select('id')
      .from('posts')
      .whereNot({ authorId: response.body.user.id })
      .first();
    id2 = post2.id;
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should NOT be able to delete a post if not authorized', async () => {
    const response = await request(app).delete(`/api/posts/${id}`).send();

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"authorization" is required');
  });

  it('Should NOT be able to update a post that is not the owner', async () => {
    const response = await request(app)
      .delete(`/api/posts/${id2}`)
      .send()
      .set('authorization', authorization);

    expect(response.status).toBe(403);
    expect(response.body.error).toBe("cannot delete other user's post");
  });

  it('Should NOT be able to update a post that does not exist', async () => {
    const response = await request(app)
      .delete(`/api/posts/notexistent`)
      .send()
      .set('authorization', authorization);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('post not found');
  });

  it('Should be able to delete a post', async () => {
    const response = await request(app)
      .delete(`/api/posts/${id}`)
      .send()
      .set('authorization', authorization);

    expect(response.status).toBe(200);

    const post = await knex
      .select('deletedAt')
      .from('posts')
      .where({ id })
      .first();

    expect(post.deletedAt).toBeTruthy();
  });
});
