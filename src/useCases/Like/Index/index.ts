import LikesRepository from '../../../repositories/implementations/LikesRepository';
import IndexLikeUseCase from './IndexLikeUseCase';
import IndexLikeController from './IndexLikeController';

const likesRepository = new LikesRepository();

const indexLikeUseCase = new IndexLikeUseCase(likesRepository);

const indexLikeController = new IndexLikeController(indexLikeUseCase);

export { indexLikeUseCase, indexLikeController };
