import IPostLikesRepository from '../../../repositories/IPostLikesRepository';
import IPostsRepository from '../../../repositories/IPostsRepository';
import ICreatePostLikeDTO from './CreatePostLikeDTO';
import PostLike from '../../../entities/PostLike';
import User from '../../../entities/User';

import RequestError from '../../../utils/RequestError';

export default class CreatePostLikeUseCase {
  constructor(
    private PostLikesRepository: IPostLikesRepository,
    private postsRepository: IPostsRepository,
  ) {}

  async execute(data: ICreatePostLikeDTO): Promise<PostLike> {
    const user = new User({ id: data.userId });
    const post = await this.postsRepository.findById(data.postId);

    if (!post) {
      throw RequestError.POST_NOT_FOUND;
    }

    const postLikeExists = await this.PostLikesRepository.findByPair(
      data.userId,
      data.postId,
    );

    if (postLikeExists) {
      throw RequestError.REPEATED_LIKE;
    }

    const postLike = new PostLike({ user, post });

    const createdPostLike = await this.PostLikesRepository.save(postLike);

    return createdPostLike;
  }
}
