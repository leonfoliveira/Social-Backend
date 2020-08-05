import ICommentsRepository from '../../../repositories/ICommentsRepository';
import IPostsRepository from '../../../repositories/IPostsRepository';
import ICreatCommentDTO from './CreateCommentDTO';
import Comment from '../../../entities/Comment';
import User from '../../../entities/User';

import RequestError from '../../../utils/RequestError';

export default class CreateCommentUseCase {
  constructor(
    private commentsRepository: ICommentsRepository,
    private postsRepository: IPostsRepository,
  ) {}

  async execute(data: ICreatCommentDTO): Promise<Comment> {
    const user = new User({ id: data.userId });
    const post = await this.postsRepository.findById(data.postId);

    if (!post) {
      throw RequestError.POST_NOT_FOUND;
    }

    const comment = new Comment({
      user,
      post,
      text: data.text,
    });

    const createdComment = await this.commentsRepository.save(comment);

    return createdComment;
  }
}
