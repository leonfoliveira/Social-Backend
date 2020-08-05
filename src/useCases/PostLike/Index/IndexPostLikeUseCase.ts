import IPostLikeRepository from '../../../repositories/IPostLikesRepository';
import IIndexPostLikeDTO from './IndexPostLikeDTO';
import PostLike from '../../../entities/PostLike';

export default class IndexPostLikeUseCase {
  constructor(private postlikeRepository: IPostLikeRepository) {}

  async execute(
    data: IIndexPostLikeDTO,
  ): Promise<{
    postLikes: PostLike[];
    count: number;
    pages: number;
  }> {
    const { page, perPage, userId, postId } = data;

    let index;

    if (userId) {
      index = await this.postlikeRepository.indexByUser(page, perPage, userId);
    } else if (postId) {
      index = await this.postlikeRepository.indexByPost(page, perPage, postId);
    } else {
      index = await this.postlikeRepository.index(page, perPage);
    }

    return index;
  }
}
