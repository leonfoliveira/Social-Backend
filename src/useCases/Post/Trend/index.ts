import PostsRepository from '../../../repositories/implementations/PostsRepository';
import TrendPostUseCase from './TrendPostUseCase';
import TrendPostController from './TrendPostController';

const postsRepository = new PostsRepository();

const trendPostUseCase = new TrendPostUseCase(postsRepository);

const trendPostController = new TrendPostController(trendPostUseCase);

export { trendPostUseCase, trendPostController };
