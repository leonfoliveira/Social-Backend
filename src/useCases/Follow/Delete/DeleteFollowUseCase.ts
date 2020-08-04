import FollowsRepository from '../../../repositories/implementations/FollowsRepository';
import IDeleteFollowDTO from './DeleteFollowDTO';

import RequestError from '../../../utils/RequestError';

export default class DeleteFollowUseCase {
  constructor(private followsRepository: FollowsRepository) {}

  async execute(data: IDeleteFollowDTO): Promise<void> {
    const followExists = await this.followsRepository.findById(data.id);

    if (!followExists) {
      throw RequestError.FOLLOW_NOT_FOUND;
    }

    if (followExists.follower.id !== data.authId) {
      throw RequestError.DELETE_FOLLOW_NOT_OWNER;
    }

    await this.followsRepository.delete(data.id);
  }
}
