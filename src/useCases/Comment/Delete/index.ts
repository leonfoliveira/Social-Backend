import CommentsRepository from '../../../repositories/implementations/CommentsRepository';
import DeleteCommentUseCase from './DeleteCommentUseCase';
import DeleteCommentController from './DeleteCommentController';

const commentsRepository = new CommentsRepository();

const deleteCommentUseCase = new DeleteCommentUseCase(commentsRepository);
const deleteCommentController = new DeleteCommentController(
  deleteCommentUseCase,
);

export { deleteCommentUseCase, deleteCommentController };
