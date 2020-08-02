import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Index User', () => {
  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should be able to get the index of users from page 1', async () => {
    const response = await request(app).get('/api/users?page=1').send();

    expect(response.status).toBe(200);
    expect(response.header['x-total-count']).toBe('5');
    expect(response.header['x-total-pages']).toBe('1');
    expect(response.body).toHaveLength(5);
  });
});
