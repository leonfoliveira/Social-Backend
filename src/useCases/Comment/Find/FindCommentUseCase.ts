import CommentsRepository from '../../../repositories/implementations/CommentsRepository';
import IFindCommentDTO from './FindCommentDTO';
import Comment from '../../../entities/Comment';

import RequestError from '../../../utils/RequestError';

export default class FindCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute(data: IFindCommentDTO): Promise<Comment> {
    const comment = await this.commentsRepository.findById(data.id);

    if (!comment) {
      throw RequestError.COMMENT_NOT_FOUND;
    }

    return comment;
  }
}
