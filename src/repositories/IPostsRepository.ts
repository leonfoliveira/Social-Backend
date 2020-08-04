import Post from '../entities/Post';

export default interface IPostsRepository {
  index(
    page: number,
    perPage: number,
  ): Promise<{ posts: Post[]; count: number; pages: number }>;
  indexByAuthor(
    page: number,
    perPage: number,
    authorId: string,
  ): Promise<{ posts: Post[]; count: number; pages: number }>;

  feed(
    page: number,
    perPage: number,
    followerId: string,
  ): Promise<{ posts: Post[]; count: number; pages: number }>;
  trend(
    page: number,
    perPage: number,
    time: number,
  ): Promise<{ posts: Post[]; count: number; pages: number }>;

  findById(id: string): Promise<Post | undefined>;

  save(post: Post): Promise<Post>;

  update(id: string, post: Post): Promise<Post>;

  delete(id: string): Promise<void>;
}
