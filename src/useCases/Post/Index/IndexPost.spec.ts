import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Index Post', () => {
  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should be able to get the index of posts from page 1', async () => {
    const response = await request(app).get('/api/posts?page=1').send();    

    expect(response.status).toBe(200);
    expect(response.header['x-total-count']).toBe('10');
    expect(response.header['x-total-pages']).toBe('1');
    expect(response.body).toHaveLength(10);
  });

  it('Should be able to get the index of posts from page 1 of a specific author', async () => {
    const { id } = await knex.select('id').from('users').first();

    const response = await request(app)
      .get(`/api/posts?page=1&author-id=${id}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.header['x-total-count']).toBe('2');
    expect(response.header['x-total-pages']).toBe('1');
    expect(response.body).toHaveLength(2);
  });
});
