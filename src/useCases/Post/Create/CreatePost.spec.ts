import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Create Post', () => {
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

  it('Should NOT be able to create a new post without authentication', async () => {
    const response = await request(app).post('/api/posts').send({
      text: 'Text',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"authorization" is required');
  });

  it('Should NOT be able to create a new post without text', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send()
      .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('empty create body');
  });

  it('Should NOT be able to create a new post with text longer than 256 characters', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({
        text: [...Array(260).keys()].reduce((final) => final + '_', ''),
      })
      .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      '"text" length must be less than or equal to 256 characters long',
    );
  });

  it('Should be able to create a new user post', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({
        text: 'Text',
      })
      .set('authorization', authorization);

    expect(response.status).toBe(201);
  });
});
