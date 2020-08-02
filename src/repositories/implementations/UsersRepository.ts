import IUsersRepository from '../IUsersRepository';
import User from '../../entities/User';
import knex from '../../database';

export default class UsersRepository implements IUsersRepository {
  private baseSelectQuery = knex
    .select<User[]>(['id', 'email', 'name', 'tag', 'createdAt', 'updatedAt'])
    .from('users')
    .where({ deletedAt: null });

  async index(
    page: number,
    perPage: number,
  ): Promise<{ users: User[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const users = await this.baseSelectQuery
      .clone()
      .limit(limit)
      .offset(offset);

    const { count } = await knex
      .count()
      .from('users')
      .where({ deletedAt: null })
      .first<{ count: number }>();

    return { users, count, pages: Math.ceil(count / perPage) };
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
    const createdUser = await knex
      .insert(user)
      .into('users')
      .returning<User>([
        'id',
        'email',
        'name',
        'tag',
        'createdAt',
        'updatedAt',
      ]);

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
