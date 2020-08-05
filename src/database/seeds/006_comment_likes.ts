import Knex from 'knex';
import { uuid } from 'uuidv4';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('comment_likes').del();

  const users = await knex.select('id').from('users');

  const comments = await knex.select('id').from('comments');

  // Inserts seed entries
  await knex('comment_likes').insert([
    {
      id: uuid(),
      userId: users[0].id,
      commentId: comments[2].id,
    },
    {
      id: uuid(),
      userId: users[0].id,
      commentId: comments[3].id,
    },
    {
      id: uuid(),
      userId: users[0].id,
      commentId: comments[4].id,
    },
    {
      id: uuid(),
      userId: users[2].id,
      commentId: comments[1].id,
    },
    {
      id: uuid(),
      userId: users[2].id,
      commentId: comments[4].id,
    },
    {
      id: uuid(),
      userId: users[3].id,
      commentId: comments[2].id,
    },
    {
      id: uuid(),
      userId: users[4].id,
      commentId: comments[2].id,
    },
  ]);
}
