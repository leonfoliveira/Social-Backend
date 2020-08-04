import ILikesRepository from '../../../repositories/ILikesRepository';
import IPostsRepository from '../../../repositories/IPostsRepository';
import ICreateLikeDTO from './CreateLikeDTO';
import Like from '../../../entities/Like';
import User from '../../../entities/User';

import RequestError from '../../../utils/RequestError';

export default class CreateLikeUseCase {
  constructor(
    private likesRepository: ILikesRepository,
    private postsRepository: IPostsRepository,
  ) {}

  async execute(data: ICreateLikeDTO): Promise<Like> {
    const user = new User({ id: data.userId });
    const post = await this.postsRepository.findById(data.postId);

    if (!post) {
      throw RequestError.POST_NOT_FOUND;
    }

    const likeExists = await this.likesRepository.findByPair(
      data.userId,
      data.postId,
    );

    if (likeExists) {
      throw RequestError.REPEATED_LIKE;
    }

    const like = new Like({ user, post });

    const createdLike = await this.likesRepository.save(like);

    return createdLike;
  }
}
