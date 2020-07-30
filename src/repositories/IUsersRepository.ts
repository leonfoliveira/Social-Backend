import User from '../entities/User';

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findByTag(tag: string): Promise<User | undefined>;

  save(user: User): Promise<User>;
}
