import LikesRepository from '../../../repositories/implementations/LikesRepository';
import IDeleteLikeDTO from './DeleteLikeDTO';

import RequestError from '../../../utils/RequestError';

export default class DeleteLikeUseCase {
  constructor(private likesRepository: LikesRepository) {}

  async execute(data: IDeleteLikeDTO): Promise<void> {
    const likeExists = await this.likesRepository.findById(data.id);

    if (!likeExists) {
      throw RequestError.LIKE_NOT_FOUND;
    }

    if (likeExists.user.id !== data.authId) {
      throw RequestError.DELETE_LIKE_NOT_OWNER;
    }

    await this.likesRepository.delete(data.id);
  }
}
