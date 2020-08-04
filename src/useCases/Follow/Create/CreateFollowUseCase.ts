import IFollowsRepository from '../../../repositories/IFollowsRepository';
import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateFollowDTO from './CreateFollowDTO';
import Follow from '../../../entities/Follow';
import User from '../../../entities/User';

import RequestError from '../../../utils/RequestError';

export default class CreateFollowUseCase {
  constructor(
    private followsRepository: IFollowsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: ICreateFollowDTO): Promise<Follow> {
    const follower = new User({ id: data.followerId });
    const target = await this.usersRepository.findById(data.targetId);

    if (!target) {
      throw RequestError.TARGET_NOT_FOUND;
    }

    if (data.followerId === target.id) {
      throw RequestError.FOLLOW_ITSELF;
    }

    const followExists = await this.followsRepository.findByPair(
      data.followerId,
      data.targetId,
    );

    if (followExists) {
      throw RequestError.REPEATED_FOLLOW;
    }

    const follow = new Follow({ follower, target });

    const createdFollow = await this.followsRepository.save(follow);

    return createdFollow;
  }
}
