import IUsersRepository from '../IUsersRepository';
import User from '../../entities/User';
import knex from '../../database';

export default class UsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await knex.select('*').from('users').where({ email }).first();

    return user;
  }

  async findByTag(tag: string): Promise<User | undefined> {
    const user = await knex.select('*').from('users').where({ tag }).first();

    return user;
  }

  async save(user: User): Promise<User> {
    const [createdUser] = await knex.insert(user).into('users').returning('*');

    return createdUser;
  }
}
