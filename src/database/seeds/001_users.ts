import Knex from 'knex';
import { uuid } from 'uuidv4';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  const users = [
    {
      id: uuid(),
      email: 'person.a@mail.com',
      name: 'Person A',
      tag: 'persona',
      password: '123',
    },
    {
      id: uuid(),
      email: 'person.b@mail.com',
      name: 'Person B',
      tag: 'personb',
      password: '123',
    },
    {
      id: uuid(),
      email: 'person.c@mail.com',
      name: 'Person C',
      tag: 'personc',
      password: '123',
    },
    {
      id: uuid(),
      email: 'person.d@mail.com',
      name: 'Person D',
      tag: 'persond',
      password: '123',
    },
    {
      id: uuid(),
      email: 'person.e@mail.com',
      name: 'Person E',
      tag: 'persone',
      password: '123',
    },
  ];

  const hashedUsers = users.map((user) => {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    return { ...user, salt, password: hashedPassword };
  });

  // Inserts seed entries
  await knex('users').insert(hashedUsers);
}
