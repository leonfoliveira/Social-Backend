import knex from './index';

describe('Database connection', () => {
  it('Should be able to connect the database and run migrations', async () => {
    await knex.migrate.latest();
    await knex.migrate.rollback();
    await knex.destroy();
  });
});
