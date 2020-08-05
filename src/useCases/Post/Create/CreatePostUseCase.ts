import IPostsRepository from '../../../repositories/IPostsRepository';
import ICreatPostDTO from './CreatePostDTO';
import Post from '../../../entities/Post';
import User from '../../../entities/User';

import RequestError from '../../../utils/RequestError';

export default class CreatePostUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(data: ICreatPostDTO): Promise<Post> {
    const author = new User({ id: data.authorId });

    if (!data.text && !data.image) {
      throw RequestError.EMPTY_CREATE_BODY;
    }

    const post = new Post({
      ...data,
      author,
      image: data.image?.replace('public', 'static'),
    });

    const createdPost = await this.postsRepository.save(post);

    return createdPost;
  }
}
