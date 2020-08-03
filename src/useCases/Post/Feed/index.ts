import PostsRepository from '../../../repositories/implementations/PostsRepository';
import FeedPostUseCase from './FeedPostUseCase';
import FeedPostController from './FeedPostController';

const postsRepository = new PostsRepository();

const feedPostUseCase = new FeedPostUseCase(postsRepository);

const feedPostController = new FeedPostController(feedPostUseCase);

export { feedPostUseCase, feedPostController };
