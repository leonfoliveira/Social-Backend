import Knex from 'knex';

export const up = async (knex: Knex): Promise<void> =>
  knex.schema.createTable('comment_likes', (table) => {
    table.string('id', 36).unique().notNullable();

    table
      .string('userId', 36)
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE');
    table
      .string('commentId', 36)
      .notNullable()
      .references('comments.id')
      .onDelete('CASCADE');

    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('deletedAt');
  });

export const down = async (knex: Knex): Promise<void> =>
  knex.schema.dropTable('comment_likes');
