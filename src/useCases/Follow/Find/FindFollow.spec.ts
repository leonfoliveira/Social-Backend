import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Find User', () => {
  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should be able to find a follow', async () => {
    const follow = await knex.select('*').from('follows').first();

    const response = await request(app)
      .get(`/api/follows/${follow.followerId}/${follow.targetId}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('Should NOT be able to find a follow that does not exist', async () => {
    const follower = await knex.select('*').from('users').first();
    const target = await knex
      .select('*')
      .from('users')
      .whereNotIn('id', function () {
        this.select('targetId')
          .from('follows')
          .where({ followerId: follower.id });
      })
      .whereNot({ id: follower.id })
      .first();

    console.log(target);

    const response = await request(app)
      .get(`/api/follows/${follower.id}/${target.id}`)
      .send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('follow not found');
  });
});
