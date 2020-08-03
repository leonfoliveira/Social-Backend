import Like from '../entities/Like';
import User from '../entities/User';
import Post from '../entities/Post';

export default interface ILikesRepository {
  findByPair(user: User, post: Post): Promise<Like | undefined>;

  save(like: Like): Promise<Like>;
}
