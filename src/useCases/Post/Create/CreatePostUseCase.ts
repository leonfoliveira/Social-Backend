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

  async execute(
    data: ICreatPostDTO,
  ): Promise<Omit<Post, 'updatedAt' | 'deletedAt'>> {
    const postAuthor = new User({ id: data.authorId });

    const post = new Post({ ...data, author: postAuthor });

    const { id, author, text, createdAt } = await this.postsRepository.save(
      post,
    );

    delete author.password;
    delete author.salt;
    delete author.deletedAt;

    return { id, author, text, createdAt };
  }
}
