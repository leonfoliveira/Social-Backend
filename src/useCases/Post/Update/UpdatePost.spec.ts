import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Update Post', () => {
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

  it('Should not be able to update a post if not authorized', async () => {
    const response = await request(app).put(`/api/posts/${id}`).send({
      text: 'updated text',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"authorization" is required');
  });

  it('Should not be able to update a post with text longer than 256 characters', async () => {
    const response = await request(app)
      .put(`/api/posts/${id}`)
      .send({
        text: [...Array(260).keys()].reduce((final) => final + '_', ''),
      })
      .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      '"text" length must be less than or equal to 256 characters long',
    );
  });

  it('Should NOT be able to update a post with empty body', async () => {
    const response = await request(app)
      .put(`/api/posts/${id}`)
      .send()
      .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('empty update body');
  });

  it('Should be able to update a post with valid data', async () => {
    const response = await request(app)
      .put(`/api/posts/${id}`)
      .send({
        text: 'updated text',
      })
      .set('authorization', authorization);

    expect(response.status).toBe(200);
  });

  it('Should NOT be able to update a post that is not the owner', async () => {
    const response = await request(app)
      .put(`/api/posts/${id2}`)
      .send({
        text: 'updated text',
      })
      .set('authorization', authorization);

    expect(response.status).toBe(403);
    expect(response.body.error).toBe("cannot update other user's post");
  });
});
