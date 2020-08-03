import LikesRepository from '../../../repositories/implementations/LikesRepository';
import DeleteLikeUseCase from './DeleteLikeUseCase';
import DeleteLikeController from './DeleteLikeController';

const likesRepository = new LikesRepository();

const deleteLikeUseCase = new DeleteLikeUseCase(likesRepository);
const deleteLikeController = new DeleteLikeController(deleteLikeUseCase);

export { deleteLikeUseCase, deleteLikeController };
