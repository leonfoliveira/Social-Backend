import PostsRepository from '../../../repositories/implementations/PostsRepository';
import UpdatePostUseCase from './UpdatePostUseCase';
import UpdatePostController from './UpdatePostController';

const postsRepository = new PostsRepository();

const updatePostUseCase = new UpdatePostUseCase(postsRepository);

const updatePostController = new UpdatePostController(updatePostUseCase);

export { updatePostUseCase, updatePostController };
