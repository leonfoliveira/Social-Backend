import IPostsRepository from '../../../repositories/IPostsRepository';
import ICreatPostDTO from './CreatePostDTO';
import Post from '../../../entities/Post';

export default class CreatePostUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(
    data: ICreatPostDTO,
  ): Promise<Omit<Post, 'updatedAt' | 'deletedAt'>> {
    const post = new Post(data);

    const { id, authorId, text, createdAt } = await this.postsRepository.save(
      post,
    );

    return { id, authorId, text, createdAt };
  }
}
