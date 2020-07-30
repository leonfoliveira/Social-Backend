import IUsersRepository from '../IUsersRepository';
import User from '../../entities/User';

export default class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async findByTag(tag: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.tag === tag);

    return user;
  }

  async save(user: User): Promise<User> {
    this.users.push(user);

    return this.users[this.users.length - 1];
  }
}
