import CommentLikesRepository from '../../../repositories/implementations/CommentLikesRepository';
import CommentsRepository from '../../../repositories/implementations/CommentsRepository';
import CreateCommentLikeUseCase from './CreateCommentLikeUseCase';
import CreateCommentLikeController from './CreateCommentLikeController';

const commentLikesRepository = new CommentLikesRepository();
const commentsRepository = new CommentsRepository();

const createCommentLikeUseCase = new CreateCommentLikeUseCase(
  commentLikesRepository,
  commentsRepository,
);

const createCommentLikeController = new CreateCommentLikeController(
  createCommentLikeUseCase,
);

export { createCommentLikeUseCase, createCommentLikeController };
