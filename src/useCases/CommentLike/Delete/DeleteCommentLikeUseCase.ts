import CommentLikesRepository from '../../../repositories/implementations/CommentLikesRepository';
import IDeleteCommentLikeDTO from './DeleteCommentLikeDTO';

import RequestError from '../../../utils/RequestError';

export default class DeleteCommentLikeUseCase {
  constructor(private commentlikesRepository: CommentLikesRepository) {}

  async execute(data: IDeleteCommentLikeDTO): Promise<void> {
    const commentlikeExists = await this.commentlikesRepository.findById(
      data.id,
    );

    if (!commentlikeExists) {
      throw RequestError.LIKE_NOT_FOUND;
    }

    if (commentlikeExists.user.id !== data.authId) {
      throw RequestError.DELETE_LIKE_NOT_OWNER;
    }

    await this.commentlikesRepository.delete(data.id);
  }
}
