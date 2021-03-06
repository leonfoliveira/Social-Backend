import User from '../entities/User';

export default interface IUsersRepository {
  index(
    page: number,
    perPage: number,
  ): Promise<{ users: User[]; count: number; pages: number }>;
  indexBySlug(
    page: number,
    perPage: number,
    slug: string,
  ): Promise<{ users: User[]; count: number; pages: number }>;
  indexByTagSlug(
    page: number,
    perPage: number,
    slug: string,
  ): Promise<{ users: User[]; count: number; pages: number }>;

  trend(
    page: number,
    perPage: number,
    time: number,
  ): Promise<{ users: User[]; count: number; pages: number }>;

  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByTag(tag: string): Promise<User | undefined>;

  save(user: User): Promise<User>;

  update(id: string, user: User): Promise<User>;

  delete(id: string): Promise<void>;
}
