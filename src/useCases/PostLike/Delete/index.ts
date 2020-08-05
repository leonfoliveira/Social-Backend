import PostLikesRepository from '../../../repositories/implementations/PostLikesRepository';
import DeletePostLikeUseCase from './DeletePostLikeUseCase';
import DeletePostLikeController from './DeletePostLikeController';

const PostlikesRepository = new PostLikesRepository();

const deletePostLikeUseCase = new DeletePostLikeUseCase(PostlikesRepository);
const deletePostLikeController = new DeletePostLikeController(
  deletePostLikeUseCase,
);

export { deletePostLikeUseCase, deletePostLikeController };
