import LikesRepository from '../../../repositories/implementations/LikesRepository';
import PostsRepository from '../../../repositories/implementations/PostsRepository';
import CreateLikeUseCase from './CreateLikeUseCase';
import CreateLikeController from './CreateLikeController';

const likesRepository = new LikesRepository();
const postsRepository = new PostsRepository();

const createLikeUseCase = new CreateLikeUseCase(
  likesRepository,
  postsRepository,
);

const createLikeController = new CreateLikeController(createLikeUseCase);

export { createLikeUseCase, createLikeController };
