import Follow from '../entities/Follow';
import User from '../entities/User';

export default interface IFollowsRepository {
  index(
    page: number,
    perPage: number,
  ): Promise<{ follows: Follow[]; count: number; pages: number }>;
  indexByFollower(
    page: number,
    perPage: number,
    follower: User,
  ): Promise<{ follows: Follow[]; count: number; pages: number }>;
  indexByTarget(
    page: number,
    perPage: number,
    target: User,
  ): Promise<{ follows: Follow[]; count: number; pages: number }>;

  findById(id: string): Promise<Follow | undefined>;
  findByPair(follower: User, target: User): Promise<Follow | undefined>;

  save(follow: Follow): Promise<Follow>;

  delete(id: string): Promise<void>;
}
