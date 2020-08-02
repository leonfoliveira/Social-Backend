import Follow from '../entities/Follow';
import User from '../entities/User';

export default interface IFollowsRepository {
  findById(id: string): Promise<Follow | undefined>;
  findByPair(follower: User, target: User): Promise<Follow | undefined>;

  save(follow: Follow): Promise<Follow>;
}
