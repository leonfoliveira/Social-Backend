import Like from '../entities/Like';

export default interface ILikesRepository {
  index(
    page: number,
    perPage: number,
  ): Promise<{ likes: Like[]; count: number; pages: number }>;
  indexByUser(
    page: number,
    perPage: number,
    userId: string,
  ): Promise<{ likes: Like[]; count: number; pages: number }>;
  indexByPost(
    page: number,
    perPage: number,
    postId: string,
  ): Promise<{ likes: Like[]; count: number; pages: number }>;

  findById(id: string): Promise<Like | undefined>;
  findByPair(userId: string, postId: string): Promise<Like | undefined>;

  save(like: Like): Promise<Like>;

  delete(id: string): Promise<void>;
}
