import CommentsRepository from '../../../repositories/implementations/CommentsRepository';
import IUpdateCommentDTO from './UpdateCommentDTO';
import Comment from '../../../entities/Comment';

import RequestError from '../../../utils/RequestError';

export default class UpdateCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute(data: IUpdateCommentDTO): Promise<Comment | void> {
    const CommentExists = await this.commentsRepository.findById(data.id);

    if (!CommentExists) {
      throw RequestError.COMMENT_NOT_FOUND;
    }

    if (CommentExists.user.id !== data.authId) {
      throw RequestError.UPDATE_COMMENT_NOT_OWNER;
    }

    if (!data.text) {
      throw RequestError.EMPTY_UPDATE_BODY;
    }

    const comment = new Comment(data);
    comment.updatedAt = new Date();

    const updatedComment = await this.commentsRepository.update(
      data.id,
      comment,
    );

    return updatedComment;
  }
}
