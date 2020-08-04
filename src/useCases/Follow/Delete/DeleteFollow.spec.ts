import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Delete Follow', () => {
  let authorization: string;
  let userId: string;
  let followId: string;
  let followId2: string;

  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();

    const response = await request(app).post('/api/sessions').send({
      email: 'person.a@mail.com',
      password: '12345678',
    });
    authorization = `Bearer ${response.body.token}`;
    userId = response.body.user.id;

    const follow = await knex
      .select('id')
      .from('follows')
      .where({ followerId: userId })
      .first();
    followId = follow.id;

    const follow2 = await knex
      .select('id')
      .from('follows')
      .whereNot({ followerId: userId })
      .first();
    followId2 = follow2.id;
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should be able to delete a follow', async () => {
    const response = await request(app)
      .delete(`/api/follows/${followId}`)
      .send()
      .set('authorization', authorization);

    expect(response.status).toBe(200);
  });

  it('Should NOT be able to delete a follow that does not exists', async () => {
    const response = await request(app)
      .delete(`/api/follows/notexistent`)
      .send()
      .set('authorization', authorization);

    expect(response.status).toBe(404);
  });

  it('Should NOT be able to delete a follow that is not owner', async () => {
    const response = await request(app)
      .delete(`/api/follows/${followId2}`)
      .send()
      .set('authorization', authorization);

    expect(response.status).toBe(403);
  });
});
