import FollowsRepository from '../../../repositories/implementations/FollowsRepository';
import DeleteFollowUseCase from './DeleteFollowUseCase';
import DeleteFollowController from './DeleteFollowController';

const followsRepository = new FollowsRepository();

const deleteFollowUseCase = new DeleteFollowUseCase(followsRepository);
const deleteFollowController = new DeleteFollowController(deleteFollowUseCase);

export { deleteFollowUseCase, deleteFollowController };
