import UsersRepository from '../../../repositories/implementations/UsersRepository';
import FindSessionUseCase from './FindSessionUseCase';
import FindSessionController from './FindSessionController';

const usersRepository = new UsersRepository();

const findSessionUseCase = new FindSessionUseCase(usersRepository);

const findSessionController = new FindSessionController(findSessionUseCase);

export { findSessionUseCase, findSessionController };
