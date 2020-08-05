import ICommentLikeRepository from '../../../repositories/ICommentLikesRepository';
import IIndexCommentLikeDTO from './IndexCommentLikeDTO';
import CommentLike from '../../../entities/CommentLike';

export default class IndexCommentLikeUseCase {
  constructor(private commentlikeRepository: ICommentLikeRepository) {}

  async execute(
    data: IIndexCommentLikeDTO,
  ): Promise<{
    commentLikes: CommentLike[];
    count: number;
    pages: number;
  }> {
    const { page, perPage, userId, commentId } = data;

    let index;

    if (userId) {
      index = await this.commentlikeRepository.indexByUser(
        page,
        perPage,
        userId,
      );
    } else if (commentId) {
      index = await this.commentlikeRepository.indexByComment(
        page,
        perPage,
        commentId,
      );
    } else {
      index = await this.commentlikeRepository.index(page, perPage);
    }

    return index;
  }
}
