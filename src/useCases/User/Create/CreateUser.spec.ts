import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Create User', () => {
  beforeAll(async () => {
    await knex.migrate.latest();
  });

  afterAll(async () => {
    await knex.migrate.down();
    await knex.destroy();
  });

  it('Should NOT be able to create a new user without email', async () => {
    const response = await request(app).post('/api/users').send();

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"email" is required');
  });

  it('Should NOT be able to create a new user with invalid email', async () => {
    const response = await request(app).post('/api/users').send({
      email: 'notanemail',
      name: 'name',
      tag: 'sample',
      password: '12345678',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"email" must be a valid email');
  });

  it('Should NOT be able to create a new user with email longer than 50 characters', async () => {
    const response = await request(app).post('/api/users').send({
      email: 'too_long_email______________________________@mail.com',
      name: 'name',
      tag: 'sample',
      password: '12345678',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      '"email" length must be less than or equal to 50 characters long',
    );
  });

  it('Should NOT be able to create a new user without name', async () => {
    const response = await request(app).post('/api/users').send({
      email: 'sample@mail.com',
      tag: 'sample',
      password: '12345678',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"name" is required');
  });

  it('Should NOT be able to create a new user with name longer than 50 characters', async () => {
    const response = await request(app).post('/api/users').send({
      email: 'sample@mail.com',
      name: 'too long name ________________________________________',
      tag: 'sample',
      password: '12345678',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      '"name" length must be less than or equal to 50 characters long',
    );
  });

  it('Should NOT be able to create a new user without tag', async () => {
    const response = await request(app).post('/api/users').send({
      email: 'sample@mail.com',
      name: 'name',
      password: '12345678',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"tag" is required');
  });

  it('Should NOT be able to create a new user with non alphanumeric tag', async () => {
    const response = await request(app).post('/api/users').send({
      email: 'sample@mail.com',
      name: 'name',
      tag: 'tag with space',
      password: '12345678',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      '"tag" must only contain alpha-numeric characters',
    );
  });

  it('Should NOT be able to create a new user with tag longer than 30 characters', async () => {
    const response = await request(app).post('/api/users').send({
      email: 'sample@mail.com',
      name: 'name',
      tag: 'toolongtag00000000000000000000000',
      password: '12345678',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      '"tag" length must be less than or equal to 30 characters long',
    );
  });

  it('Should NOT be able to create a new user without password', async () => {
    const response = await request(app).post('/api/users').send({
      email: 'sample@mail.com',
      name: 'name',
      tag: 'sample',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"password" is required');
  });

  it('Should NOT be able to create a new user with password smaller than 8 characters', async () => {
    const response = await request(app).post('/api/users').send({
      email: 'sample@mail.com',
      name: 'name',
      tag: 'sample',
      password: '123',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      '"password" length must be at least 8 characters long',
    );
  });

  it('Should NOT be able to create a new user with password longer than 30 characters', async () => {
    const response = await request(app).post('/api/users').send({
      email: 'sample@mail.com',
      name: 'name',
      tag: 'sample',
      password: '1234567890123456789012345678901234567890',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      '"password" length must be less than or equal to 30 characters long',
    );
  });

  it('Should be able to create a new user with valid data', async () => {
    const response = await request(app).post('/api/users').send({
      email: 'sample@mail.com',
      name: 'name',
      tag: 'sample',
      password: '12345678',
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('name');
    expect(response.body.tag).toBe('sample');
  });

  // it('Should NOT be able to create a new user with repeated email', async () => {
  //   const response = await request(app).post('/api/users').send({
  //     email: 'sample@mail.com',
  //     name: 'name',
  //     tag: 'sample2',
  //     password: '12345678',
  //   });

  //   expect(response.status).toBe(400);
  //   expect(response.body.error).toBe('email already exists');
  // });

  // it('Should NOT be able to create a new user with repeated tag', async () => {
  //   const response = await request(app).post('/api/users').send({
  //     email: 'sample2@mail.com',
  //     name: 'name',
  //     tag: 'sample',
  //     password: '12345678',
  //   });

  //   expect(response.status).toBe(400);
  //   expect(response.body.error).toBe('tag already exists');
  // });

  it('Should be able to create a new user with different valid data', async () => {
    const response = await request(app).post('/api/users').send({
      email: 'sample2@mail.com',
      name: 'name',
      tag: 'sample2',
      password: '12345678',
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('name');
    expect(response.body.tag).toBe('sample2');
  });
});
