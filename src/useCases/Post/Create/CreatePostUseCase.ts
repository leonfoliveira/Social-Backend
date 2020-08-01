import IPostsRepository from '../../../repositories/IPostsRepository';
import ICreatPostDTO from './CreatePostDTO';
import Post from '../../../entities/Post';
import User from '../../../entities/User';

export default class CreatePostUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(data: ICreatPostDTO): Promise<Post> {
    const author = new User({ id: data.authorId });

    const post = new Post({ ...data, author: author });

    const createdPost = await this.postsRepository.save(post);

    return createdPost;
  }
}
