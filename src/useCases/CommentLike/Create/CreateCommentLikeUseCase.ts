import ICommentLikesRepository from '../../../repositories/ICommentLikesRepository';
import ICommentsRepository from '../../../repositories/ICommentsRepository';
import ICreateCommentLikeDTO from './CreateCommentLikeDTO';
import CommentLike from '../../../entities/CommentLike';
import User from '../../../entities/User';

import RequestError from '../../../utils/RequestError';

export default class CreateCommentLikeUseCase {
  constructor(
    private commentLikesRepository: ICommentLikesRepository,
    private commentsRepository: ICommentsRepository,
  ) {}

  async execute(data: ICreateCommentLikeDTO): Promise<CommentLike> {
    const user = new User({ id: data.userId });
    const comment = await this.commentsRepository.findById(data.commentId);

    if (!comment) {
      throw RequestError.COMMENT_NOT_FOUND;
    }

    const commentLikeExists = await this.commentLikesRepository.findByPair(
      data.userId,
      data.commentId,
    );

    if (commentLikeExists) {
      throw RequestError.REPEATED_LIKE;
    }

    const commentLike = new CommentLike({ user, comment });

    const createdCommentLike = await this.commentLikesRepository.save(
      commentLike,
    );

    return createdCommentLike;
  }
}
