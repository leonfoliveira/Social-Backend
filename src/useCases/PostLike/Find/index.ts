import PostLikesRepository from '../../../repositories/implementations/PostLikesRepository';
import FindPostLikeUseCase from './FindPostLikeUseCase';
import FindPostLikeController from './FindPostLikeController';
import UsersRepository from '../../../repositories/implementations/UsersRepository';
import PostsRepository from '../../../repositories/implementations/PostsRepository';

const PostlikesRepository = new PostLikesRepository();
const usersRepository = new UsersRepository();
const postsRepository = new PostsRepository();

const findPostLikeUseCase = new FindPostLikeUseCase(
  PostlikesRepository,
  usersRepository,
  postsRepository,
);

const findPostLikeController = new FindPostLikeController(findPostLikeUseCase);

export { findPostLikeUseCase, findPostLikeController };
