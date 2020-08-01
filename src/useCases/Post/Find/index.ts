import PostsRepository from '../../../repositories/implementations/PostsRepository';
import FindPostUseCase from './FindPostUseCase';
import FindPostController from './FindPostController';

const postsRepository = new PostsRepository();

const findPostUseCase = new FindPostUseCase(postsRepository);

const findPostController = new FindPostController(findPostUseCase);

export { findPostUseCase, findPostController };
