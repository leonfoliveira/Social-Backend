import IUsersRepository from '../IUsersRepository';
import User from '../../entities/User';
import knex from '../../database';

const PAGE_SIZE = 10;

export default class UsersRepository implements IUsersRepository {
  async index(
    page: number,
  ): Promise<{ users: User[]; count: number; pages: number }> {
    const limit = PAGE_SIZE;
    const offset = (page - 1) * limit;

    const users = await knex
      .select<User[]>('*')
      .from('users')
      .where({ deletedAt: null })
      .limit(limit)
      .offset(offset);

    const { count } = await knex
      .count()
      .from('users')
      .where({ deletedAt: null })
      .first<{ count: number }>();

    return { users, count, pages: Math.ceil(count / PAGE_SIZE) };
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await knex
      .select<User[]>('*')
      .from('users')
      .where({ id, deletedAt: null })
      .first();

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await knex
      .select<User[]>('*')
      .from('users')
      .where({ email, deletedAt: null })
      .first();

    return user;
  }

  async findByTag(tag: string): Promise<User | undefined> {
    const user = await knex
      .select<User[]>('*')
      .from('users')
      .where({ tag, deletedAt: null })
      .first();

    return user;
  }

  async save(user: User): Promise<User> {
    const [createdUser] = await knex
      .insert(user)
      .into('users')
      .returning<User[]>('*');

    return createdUser;
  }

  async update(id: string, user: User): Promise<User> {
    const [updatedUser] = await knex('users')
      .update(user)
      .where({ id, deletedAt: null })
      .returning<User[]>('*');

    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await knex('users')
      .update({ deletedAt: new Date() })
      .where({ id, deletedAt: null });
  }
}
