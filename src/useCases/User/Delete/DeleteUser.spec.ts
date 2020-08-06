import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Delete User', () => {
  let authorization: string;

  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();

    const response = await request(app).post('/api/sessions').send({
      email: 'person.a@mail.com',
      password: '12345678',
    });
    authorization = `Bearer ${response.body.token}`;
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should NOT be able to delete a user if not authorized', async () => {
    const response = await request(app).delete(`/api/users`).send();

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"authorization" is required');
  });

  it('Should be able to delete a user', async () => {
    const response = await request(app)
      .delete(`/api/users`)
      .send()
      .set('authorization', authorization);

    expect(response.status).toBe(200);
  });
});
