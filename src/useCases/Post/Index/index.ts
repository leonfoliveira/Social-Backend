import PostsRepository from '../../../repositories/implementations/PostsRepository';
import IndexPostUseCase from './IndexPostUseCase';
import IndexPostController from './IndexPostController';

const postsRepository = new PostsRepository();

const indexPostUseCase = new IndexPostUseCase(postsRepository);

const indexPostController = new IndexPostController(indexPostUseCase);

export { indexPostUseCase, indexPostController };
