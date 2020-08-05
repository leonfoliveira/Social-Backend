import Knex from 'knex';
import { uuid } from 'uuidv4';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('post_likes').del();

  const users = await knex.select('id').from('users');

  const posts = await knex.select('id').from('posts');

  // Inserts seed entries
  await knex('post_likes').insert([
    {
      id: uuid(),
      userId: users[0].id,
      postId: posts[2].id,
    },
    {
      id: uuid(),
      userId: users[0].id,
      postId: posts[3].id,
    },
    {
      id: uuid(),
      userId: users[0].id,
      postId: posts[4].id,
    },
    {
      id: uuid(),
      userId: users[2].id,
      postId: posts[1].id,
    },
    {
      id: uuid(),
      userId: users[2].id,
      postId: posts[4].id,
    },
    {
      id: uuid(),
      userId: users[3].id,
      postId: posts[2].id,
    },
    {
      id: uuid(),
      userId: users[4].id,
      postId: posts[2].id,
    },
  ]);
}
