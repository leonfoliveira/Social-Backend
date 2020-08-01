import Post from '../entities/Post';

export default interface IPostsRepository {
  index(page: number): Promise<{ posts: Post[]; count: number; pages: number }>;
  indexByAuthor(
    page: number,
    authorId: string,
  ): Promise<{ posts: Post[]; count: number; pages: number }>;

  findById(id: string): Promise<Post | undefined>;

  save(post: Post): Promise<Post>;

  update(post: Post): Promise<Post>;
}
