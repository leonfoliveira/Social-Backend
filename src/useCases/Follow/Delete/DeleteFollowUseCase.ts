import FollowsRepository from '../../../repositories/implementations/FollowsRepository';
import IDeleteFollowDTO from './DeleteFollowDTO';

import RequestError from '../../../utils/RequestError';

export default class DeleteFollowUseCase {
  constructor(private followsRepository: FollowsRepository) {}

  async execute(data: IDeleteFollowDTO): Promise<void> {
    const FollowExists = await this.followsRepository.findById(data.id);

    if (!FollowExists) {
      throw RequestError.FOLLOW_NOT_FOUND;
    }

    if (FollowExists.follower.id !== data.authId) {
      throw RequestError.DELETE_FOLLOW_NOT_FOLLOWER;
    }

    await this.followsRepository.delete(data.id);
  }
}
