import IPostsRepository from '../../../repositories/IPostsRepository';
import ITrendPostDTO from './TrendPostDTO';
import Post from '../../../entities/Post';

export default class TrendPostUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(
    data: ITrendPostDTO,
  ): Promise<{
    posts: Post[];
    count: number;
    pages: number;
  }> {
    const index = await this.postsRepository.trend(data.page, data.perPage);

    return index;
  }
}
