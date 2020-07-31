import UsersRepository from '../../../repositories/implementations/UsersRepository';
import FindUserUseCase from './FindUserUseCase';
import FindUserController from './FindUserController';

const usersRepository = new UsersRepository();

const findUserUseCase = new FindUserUseCase(usersRepository);

const findUserController = new FindUserController(findUserUseCase);

export { findUserUseCase, findUserController };
