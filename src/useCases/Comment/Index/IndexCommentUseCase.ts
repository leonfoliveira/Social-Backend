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
    let index;

    if (data.userId && data.postId) {
      if (data.slug) {
        index = await this.commentRepository.indexByPairAndSlug(
          data.page,
          data.perPage,
          data.userId,
          data.postId,
          data.slug,
        );
      } else {
        index = await this.commentRepository.indexByPair(
          data.page,
          data.perPage,
          data.userId,
          data.postId,
        );
      }
    } else if (data.userId) {
      if (data.slug) {
        index = await this.commentRepository.indexByUserAndSlug(
          data.page,
          data.perPage,
          data.userId,
          data.slug,
        );
      } else {
        index = await this.commentRepository.indexByUser(
          data.page,
          data.perPage,
          data.userId,
        );
      }
    } else if (data.postId) {
      if (data.slug) {
        index = await this.commentRepository.indexByPostAndSlug(
          data.page,
          data.perPage,
          data.postId,
          data.slug,
        );
      } else {
        index = await this.commentRepository.indexByPost(
          data.page,
          data.perPage,
          data.postId,
        );
      }
    } else {
      if (data.slug) {
        index = await this.commentRepository.indexBySlug(
          data.page,
          data.perPage,
          data.slug,
        );
      } else {
        index = await this.commentRepository.index(data.page, data.perPage);
      }
    }

    return index;
  }
}
