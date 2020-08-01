import PostsRepository from '../../../repositories/implementations/PostsRepository';
import DeletePostUseCase from './DeletePostUseCase';
import DeletePostController from './DeletePostController';

const postsRepository = new PostsRepository();

const deletePostUseCase = new DeletePostUseCase(postsRepository);
const deletePostController = new DeletePostController(deletePostUseCase);

export { deletePostUseCase, deletePostController };
