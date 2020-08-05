import PostLike from '../entities/PostLike';

export default interface IPostLikesRepository {
  index(
    page: number,
    perPage: number,
  ): Promise<{ postLikes: PostLike[]; count: number; pages: number }>;
  indexByUser(
    page: number,
    perPage: number,
    userId: string,
  ): Promise<{ postLikes: PostLike[]; count: number; pages: number }>;
  indexByPost(
    page: number,
    perPage: number,
    postId: string,
  ): Promise<{ postLikes: PostLike[]; count: number; pages: number }>;

  findById(id: string): Promise<PostLike | undefined>;
  findByPair(userId: string, postId: string): Promise<PostLike | undefined>;

  save(postLike: PostLike): Promise<PostLike>;

  delete(id: string): Promise<void>;
}
