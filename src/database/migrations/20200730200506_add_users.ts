import Knex from 'knex';

export const up = async (knex: Knex): Promise<void> =>
  knex.schema.createTable('users', (table) => {
    table.string('id', 36).unique().notNullable();

    table.string('email', 50).notNullable();
    table.string('name', 50).notNullable();
    table.string('tag', 30).notNullable();
    table.string('password', 64).notNullable();
    table.string('salt', 32).notNullable();

    table
      .string('image', 35)
      .notNullable()
      .defaultTo('static/images/default.png');

    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt');
    table.timestamp('deletedAt');
  });

export const down = async (knex: Knex): Promise<void> =>
  knex.schema.dropTable('users');
