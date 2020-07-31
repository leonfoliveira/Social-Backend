import UsersRepository from '../../../repositories/implementations/UsersRepository';
import UpdateUserUseCase from './UpdateUserUseCase';
import UpdateUserController from './UpdateUserController';

const usersRepository = new UsersRepository();

const updateUserUseCase = new UpdateUserUseCase(usersRepository);

const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserUseCase, updateUserController };
