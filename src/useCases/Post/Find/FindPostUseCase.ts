import PostsRepository from '../../../repositories/implementations/PostsRepository';
import IFindPostDTO from './FindPostDTO';
import Post from '../../../entities/Post';

import RequestError from '../../../utils/RequestError';

export default class FindPostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(data: IFindPostDTO): Promise<Post> {
    const post = await this.postsRepository.findById(data.id);

    if (!post) {
      throw RequestError.POST_NOT_FOUND;
    }

    return post;
  }
}
