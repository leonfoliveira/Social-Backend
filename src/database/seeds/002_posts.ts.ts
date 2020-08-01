import Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('posts').del();

  const authors = await knex
    .select('id')
    .from('users')
    .where({ deletedAt: null });

  const posts = [];

  for (let i = 0; i < 10; i++) {
    posts.push({
      authorId: authors[Math.floor(i / 2)],
      text: 'New post text',
    });
  }

  // Inserts seed entries
  await knex('posts').insert(posts);
}
