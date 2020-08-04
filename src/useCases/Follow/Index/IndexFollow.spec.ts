import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Create Follow', () => {
  let userId: string;

  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();

    const user = await knex.select('id').from('users').first();
    userId = user.id;
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should be able to get the index of follows', async () => {
    const response = await request(app).get('/api/follows').send();

    expect(response.status).toBe(200);
  });

  it('Should be able to get the index of follows by follower', async () => {
    const response = await request(app)
      .get(`/api/follows?follower-id=${userId}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('Should be able to get the index of follows by target', async () => {
    const response = await request(app)
      .get(`/api/follows?target-id=${userId}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('Should NOT be able to get the index of follows by follower and target', async () => {
    const response = await request(app)
      .get(`/api/follows?follower-id=${userId}&target-id=${userId}`)
      .send();

    expect(response.status).toBe(400);
  });
});
