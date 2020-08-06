import RevocationsRepository from '../../../repositories/implementations/RevocationsRepository';
import DeleteSessionUseCase from './DeleteSessionUseCase';
import DeleteSessionController from './DeleteSessionController';

const revocationsRepository = new RevocationsRepository();

const deleteSessionUseCase = new DeleteSessionUseCase(revocationsRepository);

const deleteSessionController = new DeleteSessionController(
  deleteSessionUseCase,
);

export { deleteSessionUseCase, deleteSessionController };
