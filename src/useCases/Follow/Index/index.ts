import FollowsRepository from '../../../repositories/implementations/FollowsRepository';
import IndexFollowUseCase from './IndexFollowUseCase';
import IndexFollowController from './IndexFollowController';

const followsRepository = new FollowsRepository();

const indexFollowUseCase = new IndexFollowUseCase(followsRepository);

const indexFollowController = new IndexFollowController(indexFollowUseCase);

export { indexFollowUseCase, indexFollowController };
