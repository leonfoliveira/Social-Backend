import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Update Comment', () => {
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

    const comment = await knex
      .select('id')
      .from('comments')
      .where({ userId: response.body.user.id })
      .first();
    id = comment.id;

    const comment2 = await knex
      .select('id')
      .from('comments')
      .whereNot({ userId: response.body.user.id })
      .first();
    id2 = comment2.id;
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should not be able to update a comment if not authorized', async () => {
    const response = await request(app).put(`/api/comments/${id}`).send({
      text: 'updated text',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"authorization" is required');
  });

  it('Should not be able to update a comment with text longer than 256 characters', async () => {
    const response = await request(app)
      .put(`/api/comments/${id}`)
      .send({
        text: [...Array(260).keys()].reduce((final) => final + '_', ''),
      })
      .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      '"text" length must be less than or equal to 256 characters long',
    );
  });

  it('Should NOT be able to update a comment with empty body', async () => {
    const response = await request(app)
      .put(`/api/comments/${id}`)
      .send()
      .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('empty update body');
  });

  it('Should be able to update a comment with valid data', async () => {
    const response = await request(app)
      .put(`/api/comments/${id}`)
      .send({
        text: 'updated text',
      })
      .set('authorization', authorization);

    expect(response.status).toBe(200);
  });

  it('Should NOT be able to update a comment that is not the owner', async () => {
    const response = await request(app)
      .put(`/api/comments/${id2}`)
      .send({
        text: 'updated text',
      })
      .set('authorization', authorization);

    expect(response.status).toBe(403);
    expect(response.body.error).toBe("cannot update other user's comment");
  });

  it('Should NOT be able to update a comment that does not exists', async () => {
    const response = await request(app)
      .put(`/api/comments/notexistent`)
      .send({
        text: 'updated text',
      })
      .set('authorization', authorization);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('comment not found');
  });
});
