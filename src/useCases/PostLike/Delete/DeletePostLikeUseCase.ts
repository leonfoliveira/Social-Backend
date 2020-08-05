import PostLikesRepository from '../../../repositories/implementations/PostLikesRepository';
import IDeletePostLikeDTO from './DeletePostLikeDTO';

import RequestError from '../../../utils/RequestError';

export default class DeletePostLikeUseCase {
  constructor(private PostlikesRepository: PostLikesRepository) {}

  async execute(data: IDeletePostLikeDTO): Promise<void> {
    const postlikeExists = await this.PostlikesRepository.findById(data.id);

    if (!postlikeExists) {
      throw RequestError.LIKE_NOT_FOUND;
    }

    if (postlikeExists.user.id !== data.authId) {
      throw RequestError.DELETE_LIKE_NOT_OWNER;
    }

    await this.PostlikesRepository.delete(data.id);
  }
}
