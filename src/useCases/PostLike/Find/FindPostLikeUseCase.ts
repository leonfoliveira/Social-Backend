import PostLikesRepository from '../../../repositories/implementations/PostLikesRepository';
import UsersRepository from '../../../repositories/implementations/UsersRepository';
import PostsRepository from '../../../repositories/implementations/PostsRepository';
import IFindPostLikeDTO from './FindPostLikeDTO';
import PostLike from '../../../entities/PostLike';

import RequestError from '../../../utils/RequestError';

export default class FindPostLikeUseCase {
  constructor(
    private postLikesRepository: PostLikesRepository,
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
  ) {}

  async execute(data: IFindPostLikeDTO): Promise<PostLike | void> {
    const user = await this.usersRepository.findById(data.userId);
    const post = await this.postsRepository.findById(data.postId);

    if (!user) {
      throw RequestError.USER_NOT_FOUND;
    }

    if (!post) {
      throw RequestError.POST_NOT_FOUND;
    }

    const postLike = await this.postLikesRepository.findByPair(
      data.userId,
      data.postId,
    );

    if (!postLike) {
      throw RequestError.LIKE_NOT_FOUND;
    }

    return postLike;
  }
}
