import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Create Session', () => {
  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('should be able to signin', async () => {
    const response = await request(app).post('/api/sessions').send({
      email: 'person.a@mail.com',
      password: '12345678',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.name).toBe('Person A');
    expect(response.body.user.tag).toBe('persona');
  });

  it('should not be able to signin with non existent email', async () => {
    const response = await request(app).post('/api/sessions').send({
      email: 'person.a_invalid@mail.com',
      password: '12345678',
    });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('invalid email or incorrect password');
  });

  it('should not be able to signin with incorrect password', async () => {
    const response = await request(app).post('/api/sessions').send({
      email: 'person.a@mail.com',
      password: '87654321',
    });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('invalid email or incorrect password');
  });
});
