import Knex from 'knex';
import { uuid } from 'uuidv4';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('follows').del();

  const authors = await knex
    .select('id')
    .from('users')
    .where({ deletedAt: null });

  // Inserts seed entries
  await knex('follows').insert([
    {
      id: uuid(),
      followerId: authors[0].id,
      targetId: authors[2].id,
    },
    {
      id: uuid(),
      followerId: authors[0].id,
      targetId: authors[3].id,
    },
    {
      id: uuid(),
      followerId: authors[0].id,
      targetId: authors[4].id,
    },
    {
      id: uuid(),
      followerId: authors[2].id,
      targetId: authors[1].id,
    },
    {
      id: uuid(),
      followerId: authors[2].id,
      targetId: authors[4].id,
    },
    {
      id: uuid(),
      followerId: authors[3].id,
      targetId: authors[2].id,
    },
    {
      id: uuid(),
      followerId: authors[4].id,
      targetId: authors[2].id,
    },
  ]);
}
