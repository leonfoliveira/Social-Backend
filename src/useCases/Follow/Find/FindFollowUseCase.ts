import FollowsRepository from '../../../repositories/implementations/FollowsRepository';
import UsersRepository from '../../../repositories/implementations/UsersRepository';
import IFindFollowDTO from './FindFollowDTO';
import User from '../../../entities/User';
import Follow from '../../../entities/Follow';

import RequestError from '../../../utils/RequestError';

export default class FindFollowUseCase {
  constructor(
    private followsRepository: FollowsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(data: IFindFollowDTO): Promise<Follow | void> {
    const follower = await this.usersRepository.findById(data.followerId);
    const target = await this.usersRepository.findById(data.targetId);

    if (!follower) {
      throw RequestError.FOLLOWER_NOT_FOUND;
    }

    if (!target) {
      throw RequestError.TARGET_NOT_FOUND;
    }

    if (follower.id === target.id) {
      throw RequestError.FOLLOW_ITSELF;
    }

    const follow = await this.followsRepository.findByPair(
      follower as User,
      target,
    );

    if (!follow) {
      throw RequestError.FOLLOW_NOT_FOUND;
    }

    return follow;
  }
}
