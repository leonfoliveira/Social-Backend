import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Delete Follow', () => {
  let authorization: string;
  let userId: string;
  let likeId: string;

  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();

    const response = await request(app).post('/api/sessions').send({
      email: 'person.a@mail.com',
      password: '12345678',
    });
    authorization = `Bearer ${response.body.token}`;
    userId = response.body.user.id;

    const like = await knex
      .select('id')
      .from('likes')
      .where({
        userId,
      })
      .first();
    likeId = like.id;
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should be able to delete a like', async () => {
    const response = await request(app)
      .delete(`/api/likes/${likeId}`)
      .send()
      .set('authorization', authorization);

    expect(response.status).toBe(200);
  });
});
