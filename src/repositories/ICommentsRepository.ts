import Comment from '../entities/Comment';

export default interface ICommentsRepository {
  index(
    page: number,
    perPage: number,
  ): Promise<{ comments: Comment[]; count: number; pages: number }>;
  indexByUser(
    page: number,
    perPage: number,
    userId: string,
  ): Promise<{ comments: Comment[]; count: number; pages: number }>;
  indexByPost(
    page: number,
    perPage: number,
    postId: string,
  ): Promise<{ comments: Comment[]; count: number; pages: number }>;
  indexByPair(
    page: number,
    perPage: number,
    userId: string,
    postId: string,
  ): Promise<{ comments: Comment[]; count: number; pages: number }>;

  indexBySlug(
    page: number,
    perPage: number,
    slug: string,
  ): Promise<{ comments: Comment[]; count: number; pages: number }>;
  indexByUserAndSlug(
    page: number,
    perPage: number,
    userId: string,
    slug: string,
  ): Promise<{ comments: Comment[]; count: number; pages: number }>;
  indexByPostAndSlug(
    page: number,
    perPage: number,
    postId: string,
    slug: string,
  ): Promise<{ comments: Comment[]; count: number; pages: number }>;
  indexByPairAndSlug(
    page: number,
    perPage: number,
    userId: string,
    postId: string,
    slug: string,
  ): Promise<{ comments: Comment[]; count: number; pages: number }>;

  findById(id: string): Promise<Comment | undefined>;

  save(comment: Comment): Promise<Comment>;

  update(id: string, comment: Comment): Promise<Comment>;

  delete(id: string): Promise<void>;
}
