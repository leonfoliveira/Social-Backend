import LikesRepository from '../../../repositories/implementations/LikesRepository';
import UsersRepository from '../../../repositories/implementations/UsersRepository';
import PostsRepository from '../../../repositories/implementations/PostsRepository';
import IFindLikeDTO from './FindLikeDTO';
import Like from '../../../entities/Like';

import RequestError from '../../../utils/RequestError';

export default class FindLikeUseCase {
  constructor(
    private likesRepository: LikesRepository,
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
  ) {}

  async execute(data: IFindLikeDTO): Promise<Like | void> {
    const user = await this.usersRepository.findById(data.userId);
    const post = await this.postsRepository.findById(data.postId);

    if (!user) {
      throw RequestError.USER_NOT_FOUND;
    }

    if (!post) {
      throw RequestError.POST_NOT_FOUND;
    }

    const like = await this.likesRepository.findByPair(user, post);

    if (!like) {
      throw RequestError.LIKE_NOT_FOUND;
    }

    return like;
  }
}
