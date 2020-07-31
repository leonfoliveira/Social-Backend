import UsersRepository from '../../../repositories/implementations/UsersRepository';
import SessionCreateUseCase from './SessionCreateUseCase';
import SessionCreateController from './SessionCreateController';

const usersRepository = new UsersRepository();

const sessionCreateUseCase = new SessionCreateUseCase(usersRepository);

const sessionCreateController = new SessionCreateController(
  sessionCreateUseCase,
);

export { sessionCreateUseCase, sessionCreateController };
