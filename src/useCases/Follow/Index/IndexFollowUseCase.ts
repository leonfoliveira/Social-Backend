import IFollowRepository from '../../../repositories/IFollowsRepository';
import IIndexFollowDTO from './IndexFollowDTO';
import Follow from '../../../entities/Follow';

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

    let index;

    if (followerId) {
      index = await this.followRepository.indexByFollower(
        page,
        perPage,
        followerId,
      );
    } else if (targetId) {
      index = await this.followRepository.indexByTarget(
        page,
        perPage,
        targetId,
      );
    } else {
      index = await this.followRepository.index(page, perPage);
    }

    return index;
  }
}
