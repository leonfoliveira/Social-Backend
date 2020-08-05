import CommentLikesRepository from '../../../repositories/implementations/CommentLikesRepository';
import IndexCommentLikeUseCase from './IndexCommentLikeUseCase';
import IndexCommentLikeController from './IndexCommentLikeController';

const commentlikesRepository = new CommentLikesRepository();

const indexCommentLikeUseCase = new IndexCommentLikeUseCase(
  commentlikesRepository,
);

const indexCommentLikeController = new IndexCommentLikeController(
  indexCommentLikeUseCase,
);

export { indexCommentLikeUseCase, indexCommentLikeController };
