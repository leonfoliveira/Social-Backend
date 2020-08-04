import IPostsRepository from '../../../repositories/IPostsRepository';
import IFeedPostDTO from './FeedPostDTO';
import Post from '../../../entities/Post';

export default class FeedPostUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(
    data: IFeedPostDTO,
  ): Promise<{
    posts: Post[];
    count: number;
    pages: number;
  }> {
    const index = await this.postsRepository.feed(
      data.page,
      data.perPage,
      data.followerId,
    );

    return index;
  }
}
