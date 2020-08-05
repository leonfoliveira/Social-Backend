import CommentLike from '../entities/CommentLike';

export default interface ICommentLikesRepository {
  index(
    page: number,
    perPage: number,
  ): Promise<{ commentLikes: CommentLike[]; count: number; pages: number }>;
  indexByUser(
    page: number,
    perPage: number,
    userId: string,
  ): Promise<{ commentLikes: CommentLike[]; count: number; pages: number }>;
  indexByComment(
    page: number,
    perPage: number,
    commentId: string,
  ): Promise<{ commentLikes: CommentLike[]; count: number; pages: number }>;

  findById(id: string): Promise<CommentLike | undefined>;
  findByPair(
    userId: string,
    commentId: string,
  ): Promise<CommentLike | undefined>;

  save(commentLike: CommentLike): Promise<CommentLike>;

  delete(id: string): Promise<void>;
}
