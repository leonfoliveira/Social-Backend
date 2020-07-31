import UsersRepository from '../../../repositories/implementations/UsersRepository';
import DeleteUserUseCase from './DeleteUserUseCase';
import DeleteUserController from './DeleteUserController';

const usersRepository = new UsersRepository();

const deleteUserUseCase = new DeleteUserUseCase(usersRepository);

const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserUseCase, deleteUserController };
