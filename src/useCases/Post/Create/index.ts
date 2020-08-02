import PostsRepository from '../../../repositories/implementations/PostsRepository';
import CreatePostUseCase from './CreatePostUseCase';
import CreatePostController from './CreatePostController';

const postsRepository = new PostsRepository();

const createPostUseCase = new CreatePostUseCase(postsRepository);

const createPostController = new CreatePostController(createPostUseCase);

export { createPostUseCase, createPostController };
