import ICommentRepository from '../../../repositories/ICommentsRepository';
import IIndexCommentDTO from './IndexCommentDTO';
import Comment from '../../../entities/Comment';

export default class IndexCommentUseCase {
  constructor(private commentRepository: ICommentRepository) {}

  async execute(
    data: IIndexCommentDTO,
  ): Promise<{
    comments: Comment[];
    count: number;
    pages: number;
  }> {
    const { page, perPage, userId, postId } = data;

    let index;

    if (userId && postId) {
      index = await this.commentRepository.indexByPair(
        page,
        perPage,
        userId,
        postId,
      );
    } else if (userId) {
      index = await this.commentRepository.indexByUser(page, perPage, userId);
    } else if (postId) {
      index = await this.commentRepository.indexByPost(page, perPage, postId);
    } else {
      index = await this.commentRepository.index(page, perPage);
    }

    return index;
  }
}
