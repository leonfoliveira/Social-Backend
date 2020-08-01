import UsersRepository from '../../../repositories/implementations/UsersRepository';
import CreateSessionUseCase from './CreateSessionUseCase';
import CreateSessionController from './CreateSessionController';

const usersRepository = new UsersRepository();

const createSessionUseCase = new CreateSessionUseCase(usersRepository);

const createSessionController = new CreateSessionController(
  createSessionUseCase,
);

export { createSessionUseCase, createSessionController };
