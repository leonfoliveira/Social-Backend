import CommentLikesRepository from '../../../repositories/implementations/CommentLikesRepository';
import UsersRepository from '../../../repositories/implementations/UsersRepository';
import CommentsRepository from '../../../repositories/implementations/CommentsRepository';
import IFindCommentLikeDTO from './FindCommentLikeDTO';
import CommentLike from '../../../entities/CommentLike';

import RequestError from '../../../utils/RequestError';

export default class FindCommentLikeUseCase {
  constructor(
    private commentLikesRepository: CommentLikesRepository,
    private usersRepository: UsersRepository,
    private commentsRepository: CommentsRepository,
  ) {}

  async execute(data: IFindCommentLikeDTO): Promise<CommentLike | void> {
    const user = await this.usersRepository.findById(data.userId);
    const comment = await this.commentsRepository.findById(data.commentId);

    if (!user) {
      throw RequestError.USER_NOT_FOUND;
    }

    if (!comment) {
      throw RequestError.COMMENT_NOT_FOUND;
    }

    const commentLike = await this.commentLikesRepository.findByPair(
      data.userId,
      data.commentId,
    );

    if (!commentLike) {
      throw RequestError.LIKE_NOT_FOUND;
    }

    return commentLike;
  }
}
