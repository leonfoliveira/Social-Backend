import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Delete User', () => {
  let id: string;
  let authorization: string;

  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();

    const response = await request(app).post('/api/sessions').send({
      email: 'person.a@mail.com',
      password: '12345678',
    });
    id = response.body.user.id;
    authorization = `Bearer ${response.body.token}`;
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should NOT be able to delete a user if not authorized', async () => {
    const response = await request(app).delete(`/api/users/${id}`).send();

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"authorization" is required');
  });

  it('Should NOT be able to update a user that is not the authorized', async () => {
    const response = await request(app)
      .delete('/api/users/2')
      .send()
      .set('authorization', authorization);

    expect(response.status).toBe(403);
    expect(response.body.error).toBe('cannot delete other user');
  });

  it('Should be able to delete a user', async () => {
    const response = await request(app)
      .delete(`/api/users/${id}`)
      .send()
      .set('authorization', authorization);

    expect(response.status).toBe(200);

    const user = await knex
      .select('deletedAt')
      .from('users')
      .where({ id })
      .first();

    expect(user.deletedAt).toBeTruthy();
  });
});
