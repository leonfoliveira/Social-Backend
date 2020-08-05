import CommentLikesRepository from '../../../repositories/implementations/CommentLikesRepository';
import DeleteCommentLikeUseCase from './DeleteCommentLikeUseCase';
import DeleteCommentLikeController from './DeleteCommentLikeController';

const commentLikesRepository = new CommentLikesRepository();

const deleteCommentLikeUseCase = new DeleteCommentLikeUseCase(
  commentLikesRepository,
);
const deleteCommentLikeController = new DeleteCommentLikeController(
  deleteCommentLikeUseCase,
);

export { deleteCommentLikeUseCase, deleteCommentLikeController };
