import IPostsRepository from '../../../repositories/IPostsRepository';
import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreatPostDTO from './CreatePostDTO';
import Post from '../../../entities/Post';
import User from '../../../entities/User';

export default class CreatePostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: ICreatPostDTO): Promise<void> {
    const author = new User({ id: data.authorId });

    const post = new Post({ ...data, author: author });

    await this.postsRepository.save(post);
  }
}
