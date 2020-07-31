import User from '../entities/User';

export default interface IUsersRepository {
  index(page: number): Promise<{ users: User[]; count: number; pages: number }>;

  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByTag(tag: string): Promise<User | undefined>;

  save(user: User): Promise<User>;
}
