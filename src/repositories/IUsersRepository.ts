import User from '../entities/User';

export default interface IUsersRepository {
  index(page: number): Promise<{ users: User[]; count: number; pages: number }>;

  findByEmail(email: string): Promise<User | undefined>;
  findByTag(tag: string): Promise<User | undefined>;

  save(user: User): Promise<User>;
}
