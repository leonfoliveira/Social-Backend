import LikesRepository from '../../../repositories/implementations/LikesRepository';
import FindLikeUseCase from './FindLikeUseCase';
import FindLikeController from './FindLikeController';
import UsersRepository from '../../../repositories/implementations/UsersRepository';
import PostsRepository from '../../../repositories/implementations/PostsRepository';

const likesRepository = new LikesRepository();
const usersRepository = new UsersRepository();
const postsRepository = new PostsRepository();

const findLikeUseCase = new FindLikeUseCase(
  likesRepository,
  usersRepository,
  postsRepository,
);

const findLikeController = new FindLikeController(findLikeUseCase);

export { findLikeUseCase, findLikeController };
