import Knex from 'knex';

export const up = async (knex: Knex): Promise<void> =>
  knex.schema.createTable('follows', (table) => {
    table.string('id', 36).unique().notNullable();

    table
      .string('followerId', 36)
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE');
    table
      .string('targetId', 36)
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE');

    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('deletedAt');
  });

export const down = async (knex: Knex): Promise<void> =>
  knex.schema.dropTable('follows');
