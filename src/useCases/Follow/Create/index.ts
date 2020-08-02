import FollowsRepository from '../../../repositories/implementations/FollowsRepository';
import UsersRepository from '../../../repositories/implementations/UsersRepository';
import CreateFollowUseCase from './CreateFollowUseCase';
import CreateFollowController from './CreateFollowController';

const followsRepository = new FollowsRepository();
const usersRepository = new UsersRepository();

const createFollowUseCase = new CreateFollowUseCase(
  followsRepository,
  usersRepository,
);

const createFollowController = new CreateFollowController(createFollowUseCase);

export { createFollowUseCase, createFollowController };
