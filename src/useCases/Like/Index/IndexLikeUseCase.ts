import ILikeRepository from '../../../repositories/ILikesRepository';
import IIndexLikeDTO from './IndexLikeDTO';
import Like from '../../../entities/Like';

export default class IndexLikeUseCase {
  constructor(private likeRepository: ILikeRepository) {}

  async execute(
    data: IIndexLikeDTO,
  ): Promise<{
    likes: Like[];
    count: number;
    pages: number;
  }> {
    const { page, perPage, userId, postId } = data;

    let index;

    if (userId) {
      index = await this.likeRepository.indexByUser(page, perPage, userId);
    } else if (postId) {
      index = await this.likeRepository.indexByPost(page, perPage, postId);
    } else {
      index = await this.likeRepository.index(page, perPage);
    }

    return index;
  }
}
