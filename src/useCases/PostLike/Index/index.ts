import PostLikesRepository from '../../../repositories/implementations/PostLikesRepository';
import IndexPostLikeUseCase from './IndexPostLikeUseCase';
import IndexPostLikeController from './IndexPostLikeController';

const PostlikesRepository = new PostLikesRepository();

const indexPostLikeUseCase = new IndexPostLikeUseCase(PostlikesRepository);

const indexPostLikeController = new IndexPostLikeController(
  indexPostLikeUseCase,
);

export { indexPostLikeUseCase, indexPostLikeController };
