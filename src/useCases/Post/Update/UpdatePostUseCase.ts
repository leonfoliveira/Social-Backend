import PostsRepository from '../../../repositories/implementations/PostsRepository';
import IUpdatePostDTO from './UpdatePostDTO';
import Post from '../../../entities/Post';

import RequestError from '../../../utils/RequestError';

export default class UpdatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(data: IUpdatePostDTO): Promise<Post | void> {
    const postExists = await this.postsRepository.findById(data.id);

    if (!postExists) {
      throw RequestError.POST_NOT_FOUND;
    }

    if (postExists.author.id !== data.authId) {
      throw RequestError.UPDATE_POST_NOT_OWNER;
    }

    if (!data.text) {
      throw RequestError.EMPTY_UPDATE_BODY;
    }

    const post = new Post(data);
    post.updatedAt = new Date();

    const updatedPost = await this.postsRepository.update(data.id, post);

    return updatedPost;
  }
}
