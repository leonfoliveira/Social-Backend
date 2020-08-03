import ILikeRepository from '../../../repositories/ILikesRepository';
import IIndexLikeDTO from './IndexLikeDTO';
import Like from '../../../entities/Like';
import User from '../../../entities/User';
import Post from '../../../entities/Post';

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

    let likes: {
      likes: Like[];
      count: number;
      pages: number;
    };

    if (userId) {
      const user = new User({ id: userId });

      likes = await this.likeRepository.indexByUser(page, perPage, user);
    } else if (postId) {
      const post = new Post({ id: postId });

      likes = await this.likeRepository.indexByPost(page, perPage, post);
    } else {
      likes = await this.likeRepository.index(page, perPage);
    }

    return likes;
  }
}
