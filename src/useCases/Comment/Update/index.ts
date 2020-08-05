import CommentsRepository from '../../../repositories/implementations/CommentsRepository';
import UpdateCommentUseCase from './UpdateCommentUseCase';
import UpdateCommentController from './UpdateCommentController';

const commentsRepository = new CommentsRepository();

const updateCommentUseCase = new UpdateCommentUseCase(commentsRepository);

const updateCommentController = new UpdateCommentController(
  updateCommentUseCase,
);

export { updateCommentUseCase, updateCommentController };
