import IFollowRepository from '../../../repositories/IFollowsRepository';
import IIndexFollowDTO from './IndexFollowDTO';
import Follow from '../../../entities/Follow';
import User from '../../../entities/User';

export default class IndexFollowUseCase {
  constructor(private followRepository: IFollowRepository) {}

  async execute(
    data: IIndexFollowDTO,
  ): Promise<{
    follows: Follow[];
    count: number;
    pages: number;
  }> {
    const { page, perPage, followerId, targetId } = data;

    let follows: {
      follows: Follow[];
      count: number;
      pages: number;
    };

    if (followerId) {
      const follower = new User({ id: followerId });

      follows = await this.followRepository.indexByFollower(
        page,
        perPage,
        follower,
      );
    } else if (targetId) {
      const target = new User({ id: targetId });

      follows = await this.followRepository.indexByTarget(
        page,
        perPage,
        target,
      );
    } else {
      follows = await this.followRepository.index(page, perPage);
    }

    return follows;
  }
}
