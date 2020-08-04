import FollowsRepository from '../../../repositories/implementations/FollowsRepository';
import FindFollowUseCase from './FindFollowUseCase';
import FindFollowController from './FindFollowController';

const followsRepository = new FollowsRepository();

const findFollowUseCase = new FindFollowUseCase(followsRepository);

const findFollowController = new FindFollowController(findFollowUseCase);

export { findFollowUseCase, findFollowController };
