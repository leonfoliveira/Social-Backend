import PostLikesRepository from '../../../repositories/implementations/PostLikesRepository';
import DeletePostLikeUseCase from './DeletePostLikeUseCase';
import DeletePostLikeController from './DeletePostLikeController';

const postLikesRepository = new PostLikesRepository();

const deletePostLikeUseCase = new DeletePostLikeUseCase(postLikesRepository);
const deletePostLikeController = new DeletePostLikeController(
  deletePostLikeUseCase,
);

export { deletePostLikeUseCase, deletePostLikeController };
