import CommentsRepository from '../../../repositories/implementations/CommentsRepository';
import PostsRepository from '../../../repositories/implementations/PostsRepository';
import CreateCommentUseCase from './CreateCommentUseCase';
import CreateCommentController from './CreateCommentController';

const commentsRepository = new CommentsRepository();
const postsRepository = new PostsRepository();

const createCommentUseCase = new CreateCommentUseCase(
  commentsRepository,
  postsRepository,
);

const createCommentController = new CreateCommentController(
  createCommentUseCase,
);

export { createCommentUseCase, createCommentController };
