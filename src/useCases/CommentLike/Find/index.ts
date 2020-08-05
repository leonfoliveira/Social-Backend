import CommentLikesRepository from '../../../repositories/implementations/CommentLikesRepository';
import FindCommentLikeUseCase from './FindCommentLikeUseCase';
import FindCommentLikeController from './FindCommentLikeController';
import UsersRepository from '../../../repositories/implementations/UsersRepository';
import CommentsRepository from '../../../repositories/implementations/CommentsRepository';

const commentlikesRepository = new CommentLikesRepository();
const usersRepository = new UsersRepository();
const commentsRepository = new CommentsRepository();

const findCommentLikeUseCase = new FindCommentLikeUseCase(
  commentlikesRepository,
  usersRepository,
  commentsRepository,
);

const findCommentLikeController = new FindCommentLikeController(
  findCommentLikeUseCase,
);

export { findCommentLikeUseCase, findCommentLikeController };
