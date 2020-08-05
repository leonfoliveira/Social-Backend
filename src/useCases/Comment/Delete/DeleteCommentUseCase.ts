import CommentsRepository from '../../../repositories/implementations/CommentsRepository';
import IDeleteCommentDTO from './DeleteCommentDTO';

import RequestError from '../../../utils/RequestError';

export default class DeleteCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute(data: IDeleteCommentDTO): Promise<void> {
    const CommentExists = await this.commentsRepository.findById(data.id);

    if (!CommentExists) {
      throw RequestError.COMMENT_NOT_FOUND;
    }

    if (CommentExists.user.id !== data.authId) {
      throw RequestError.DELETE_COMMENT_NOT_OWNER;
    }

    await this.commentsRepository.delete(data.id);
  }
}
