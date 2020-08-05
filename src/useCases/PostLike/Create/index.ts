import PostLikesRepository from '../../../repositories/implementations/PostLikesRepository';
import PostsRepository from '../../../repositories/implementations/PostsRepository';
import CreatePostLikeUseCase from './CreatePostLikeUseCase';
import CreatePostLikeController from './CreatePostLikeController';

const postLikesRepository = new PostLikesRepository();
const postsRepository = new PostsRepository();

const createPostLikeUseCase = new CreatePostLikeUseCase(
  postLikesRepository,
  postsRepository,
);

const createPostLikeController = new CreatePostLikeController(
  createPostLikeUseCase,
);

export { createPostLikeUseCase, createPostLikeController };
