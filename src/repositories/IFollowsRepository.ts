import Follow from '../entities/Follow';

export default interface IFollowsRepository {
  index(
    page: number,
    perPage: number,
  ): Promise<{ follows: Follow[]; count: number; pages: number }>;
  indexByFollower(
    page: number,
    perPage: number,
    followerId: string,
  ): Promise<{ follows: Follow[]; count: number; pages: number }>;
  indexByTarget(
    page: number,
    perPage: number,
    targetId: string,
  ): Promise<{ follows: Follow[]; count: number; pages: number }>;

  findById(id: string): Promise<Follow | undefined>;
  findByPair(followerId: string, targetId: string): Promise<Follow | undefined>;

  save(follow: Follow): Promise<Follow>;

  delete(id: string): Promise<void>;
}
