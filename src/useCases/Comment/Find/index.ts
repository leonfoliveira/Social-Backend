import CommentsRepository from '../../../repositories/implementations/CommentsRepository';
import FindCommentUseCase from './FindCommentUseCase';
import FindCommentController from './FindCommentController';

const commentsRepository = new CommentsRepository();

const findCommentUseCase = new FindCommentUseCase(commentsRepository);

const findCommentController = new FindCommentController(findCommentUseCase);

export { findCommentUseCase, findCommentController };
