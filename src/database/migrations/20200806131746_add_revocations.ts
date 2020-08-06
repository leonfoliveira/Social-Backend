import Knex from 'knex';

export const up = async (knex: Knex): Promise<void> =>
  knex.schema.createTable('revocations', (table) => {
    table.string('id', 36).unique().notNullable();

    table.text('token').unique().notNullable();

    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
  });

export const down = async (knex: Knex): Promise<void> =>
  knex.schema.dropTable('revocations');
