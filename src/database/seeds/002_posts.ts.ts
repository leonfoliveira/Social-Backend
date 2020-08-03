import Knex from 'knex';
import { uuid } from 'uuidv4';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('posts').del();

  const authors = await knex.select('id').from('users');

  const posts = [];

  for (let i = 0; i < 10; i++) {
    posts.push({
      id: uuid(),
      authorId: authors[Math.floor(i / 2)].id,
      text: 'New post text',
    });
  }

  // Inserts seed entries
  await knex('posts').insert(posts);
}
