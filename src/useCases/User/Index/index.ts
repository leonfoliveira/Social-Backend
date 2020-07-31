import UsersRepository from '../../../repositories/implementations/UsersRepository';
import IndexUserUseCase from './IndexUserUseCase';
import IndexUserController from './IndexUserController';

const usersRepository = new UsersRepository();

const indexUserUseCase = new IndexUserUseCase(usersRepository);

const indexUserController = new IndexUserController(indexUserUseCase);

export { indexUserUseCase, indexUserController };
