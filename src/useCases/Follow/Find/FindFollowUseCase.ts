import FollowsRepository from '../../../repositories/implementations/FollowsRepository';
import IFindFollowDTO from './FindFollowDTO';
import Follow from '../../../entities/Follow';

import RequestError from '../../../utils/RequestError';

export default class FindFollowUseCase {
  constructor(private followsRepository: FollowsRepository) {}

  async execute(data: IFindFollowDTO): Promise<Follow | void> {
    const follow = await this.followsRepository.findByPair(
      data.followerId,
      data.targetId,
    );

    if (!follow) {
      throw RequestError.FOLLOW_NOT_FOUND;
    }

    return follow;
  }
}
