import PostsRepository from '../../../repositories/implementations/PostsRepository';
import IDeletePostDTO from './DeletePostDTO';

import RequestError from '../../../utils/RequestError';

export default class DeletePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(data: IDeletePostDTO): Promise<void> {
    const postExists = await this.postsRepository.findById(data.id);

    if (!postExists) {
      throw RequestError.POST_NOT_FOUND;
    }

    if (postExists.author.id !== data.authId) {
      throw RequestError.DELETE_POST_NOT_OWNER;
    }

    await this.postsRepository.delete(data.id);
  }
}
