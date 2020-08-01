import PostsRepository from '../../../repositories/implementations/PostsRepository';
import UsersRepository from '../../../repositories/implementations/UsersRepository';
import CreatePostUseCase from './CreatePostUseCase';
import CreatePostController from './CreatePostController';

const postsRepository = new PostsRepository();
const usersRepository = new UsersRepository();

const createPostUseCase = new CreatePostUseCase(
  postsRepository,
  usersRepository,
);

const createPostController = new CreatePostController(createPostUseCase);

export { createPostUseCase, createPostController };
