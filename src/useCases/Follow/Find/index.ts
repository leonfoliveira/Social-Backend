import FollowsRepository from '../../../repositories/implementations/FollowsRepository';
import FindFollowUseCase from './FindFollowUseCase';
import FindFollowController from './FindFollowController';
import UsersRepository from '../../../repositories/implementations/UsersRepository';

const followsRepository = new FollowsRepository();
const usersRepository = new UsersRepository();

const findFollowUseCase = new FindFollowUseCase(
  followsRepository,
  usersRepository,
);

const findFollowController = new FindFollowController(findFollowUseCase);

export { findFollowUseCase, findFollowController };
