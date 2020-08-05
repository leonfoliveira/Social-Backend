import Knex from 'knex';

export const up = async (knex: Knex): Promise<void> =>
  knex.schema.createTable('posts', (table) => {
    table.string('id', 36).unique().notNullable();

    table
      .string('authorId', 36)
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE');
    table.string('text', 256);

    table.string('image', 35);

    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt');
    table.timestamp('deletedAt');
  });

export const down = async (knex: Knex): Promise<void> =>
  knex.schema.dropTable('posts');
