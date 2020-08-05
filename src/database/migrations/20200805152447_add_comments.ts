import Knex from 'knex';

export const up = async (knex: Knex): Promise<void> =>
  knex.schema.createTable('comments', (table) => {
    table.string('id', 36).unique().notNullable();

    table
      .string('userId', 36)
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE');
    table
      .string('postId', 36)
      .notNullable()
      .references('posts.id')
      .onDelete('CASCADE');
    table.string('text', 256).notNullable();

    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt');
    table.timestamp('deletedAt');
  });

export const down = async (knex: Knex): Promise<void> =>
  knex.schema.dropTable('comments');
