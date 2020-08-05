import CommentsRepository from '../../../repositories/implementations/CommentsRepository';
import IndexCommentUseCase from './IndexCommentUseCase';
import IndexCommentController from './IndexCommentController';

const commentsRepository = new CommentsRepository();

const indexCommentUseCase = new IndexCommentUseCase(commentsRepository);

const indexCommentController = new IndexCommentController(indexCommentUseCase);

export { indexCommentUseCase, indexCommentController };
