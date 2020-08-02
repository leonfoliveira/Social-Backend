import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('User Update', () => {
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

  it('Should not be able to update a user if not authorized', async () => {
    const response = await request(app).put(`/api/users/${id}`).send({
      name: 'newName',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"authorization" is required');
  });

  it('Should not be able to update a user with invalid email', async () => {
    const response = await request(app)
      .put(`/api/users/${id}`)
      .send({
        email: 'notanemail',
      })
      .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"email" must be a valid email');
  });

  it('Should not be able to update a user with email longer than 50 characters', async () => {
    const response = await request(app)
      .put(`/api/users/${id}`)
      .send({
        email: 'too_long_email_____________________________@mail.com',
      })
      .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      '"email" length must be less than or equal to 50 characters long',
    );
  });

  it('Should not be able to update a user with repeated email', async () => {
    const response = await request(app)
      .put(`/api/users/${id}`)
      .send({
        email: 'person.b@mail.com',
      })
      .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('email already exists');
  });

  it('Should not be able to update a user with name longer than 50 characters', async () => {
    const response = await request(app)
      .put(`/api/users/${id}`)
      .send({
        name: 'too long name ________________________________________',
      })
      .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      '"name" length must be less than or equal to 50 characters long',
    );
  });

  it('Should not be able to update a user with password smaller than 8 characters', async () => {
    const response = await request(app)
      .put(`/api/users/${id}`)
      .send({
        password: '123',
      })
      .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      '"password" length must be at least 8 characters long',
    );
  });

  it('Should not be able to update a user with password longer than 30 characters', async () => {
    const response = await request(app)
      .put(`/api/users/${id}`)
      .send({
        email: 'sample@mail.com',
        name: 'name',
        tag: 'sample',
        password: '1234567890123456789012345678901234567890',
      })
      .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      '"password" length must be less than or equal to 30 characters long',
    );
  });

  it('Should NOT be able to update a user with empty body', async () => {
    const response = await request(app)
      .put(`/api/users/${id}`)
      .send()
      .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('empty update body');
  });

  it('Should be able to update a user with valid data', async () => {
    const response = await request(app)
      .put(`/api/users/${id}`)
      .send({
        email: 'person.a.updated@mail.com',
        name: 'Person A Updated',
        password: '87654321',
      })
      .set('authorization', authorization);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe('person.a.updated@mail.com');
    expect(response.body.name).toBe('Person A Updated');
  });

  it('Should not be able to update a user that is not the authorized', async () => {
    const response = await request(app)
      .put('/api/users/2')
      .send({
        email: 'person.a.updated@mail.com',
        name: 'Person A Updated',
        password: '87654321',
      })
      .set('authorization', authorization);

    expect(response.status).toBe(403);
    expect(response.body.error).toBe('cannot update other user');
  });
});
