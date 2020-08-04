import UsersRepository from '../../../repositories/implementations/UsersRepository';
import TrendUserUseCase from './TrendUserUseCase';
import TrendUserController from './TrendUserController';

const usersRepository = new UsersRepository();

const trendUserUseCase = new TrendUserUseCase(usersRepository);

const trendUserController = new TrendUserController(trendUserUseCase);

export { trendUserUseCase, trendUserController };
