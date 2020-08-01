import knex from './';

describe('Database', () => {
  it('Should be able to rollback the database', async () => {
    await knex.migrate.rollback();
  });

  it('Should be able to migrate the database', async () => {
    await knex.migrate.latest();
  });

  it('Should be able to seed the database', async () => {
    await knex.seed.run();
  });

  it('Should be able to close the connection', async () => {
    await knex.destroy();
  });
});
