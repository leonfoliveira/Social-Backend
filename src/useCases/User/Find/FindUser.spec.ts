import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Find User', () => {
  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run({
      specific: '001_users.ts',
    });
  });

  afterAll(async () => {
    await knex.migrate.down();
    await knex.destroy();
  });

  it('Should be able to find a user by id', async () => {
    const { id } = await knex
      .select('id')
      .from('users')
      .where({ deletedAt: null })
      .first();

    const response = await request(app).get(`/api/users/${id}`).send();

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(id);
  });

  it('Should NOT be able to find a user by id unexistent', async () => {
    const response = await request(app).get(`/api/users/unexistent-id`).send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('user not found');
  });
});
