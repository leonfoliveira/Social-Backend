import Like from '../entities/Like';
import User from '../entities/User';
import Post from '../entities/Post';

export default interface ILikesRepository {
  index(
    page: number,
    perPage: number,
  ): Promise<{ likes: Like[]; count: number; pages: number }>;
  indexByUser(
    page: number,
    perPage: number,
    user: User,
  ): Promise<{ likes: Like[]; count: number; pages: number }>;
  indexByPost(
    page: number,
    perPage: number,
    post: Post,
  ): Promise<{ likes: Like[]; count: number; pages: number }>;

  findById(id: string): Promise<Like | undefined>;
  findByPair(user: User, post: Post): Promise<Like | undefined>;

  save(like: Like): Promise<Like>;

  delete(id: string): Promise<void>;
}
