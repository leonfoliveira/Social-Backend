import request from 'supertest';
import app from '../../../app';
import knex from '../../../database';

describe('Create Follow', () => {
  let authorization: string;
  let id: string;
  let targetId: string;

  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();

    const response = await request(app).post('/api/sessions').send({
      email: 'person.a@mail.com',
      password: '12345678',
    });
    authorization = `Bearer ${response.body.token}`;
    id = response.body.user.id;

    const response2 = await knex
      .select('id')
      .from('users')
      .whereNotIn(
        'id',
        await knex
          .select('id')
          .from('follows')
          .where({ followerId: response.body.user.id }),
      )
      .whereNot({ id })
      .first();
    targetId = response2.id;
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it('Should NOT be able to create a new follow without authentication', async () => {
    const response = await request(app).post('/api/follows').send({
      targetId,
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"authorization" is required');
  });

  it('Should NOT be able to create a new follow without targetId', async () => {
    const response = await request(app)
      .post('/api/follows')
      .send()
      .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"targetId" is required');
  });

  it('Should NOT be able to create a new follow with itself', async () => {
    const response = await request(app)
      .post('/api/follows')
      .send({
        targetId: id,
      })
      .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('cannot follow itself');
  });

  it('Should NOT be able to create a new follow with invalid target', async () => {
    const response = await request(app)
      .post('/api/follows')
      .send({
        targetId: 'target',
      })
      .set('authorization', authorization);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('target not found');
  });

  it('Should be able to create a new follow', async () => {
    const response = await request(app)
      .post('/api/follows')
      .send({
        targetId,
      })
      .set('authorization', authorization);

    expect(response.status).toBe(201);
  });

  it('Should NOT be able to create a new follow that already exists', async () => {
    const response = await request(app)
      .post('/api/follows')
      .send({
        targetId,
      })
      .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('already following');
  });
});
