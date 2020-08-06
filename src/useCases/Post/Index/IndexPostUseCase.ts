import IPostsRepository from '../../../repositories/IPostsRepository';
import IIndexPostDTO from './IndexPostDTO';
import Post from '../../../entities/Post';

export default class IndexPostUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(
    data: IIndexPostDTO,
  ): Promise<{
    posts: Post[];
    count: number;
    pages: number;
  }> {
    let index: {
      posts: Post[];
      count: number;
      pages: number;
    };

    if (data.authorId) {
      if (data.slug) {
        index = await this.postsRepository.indexByAuthorAndSlug(
          data.page,
          data.perPage,
          data.authorId,
          data.slug,
        );
      } else {
        index = await this.postsRepository.indexByAuthor(
          data.page,
          data.perPage,
          data.authorId,
        );
      }
    } else {
      if (data.slug) {
        index = await this.postsRepository.indexBySlug(
          data.page,
          data.perPage,
          data.slug,
        );
      } else {
        index = await this.postsRepository.index(data.page, data.perPage);
      }
    }

    return index;
  }
}
