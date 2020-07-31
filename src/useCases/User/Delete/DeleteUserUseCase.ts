import UsersRepository from '../../../repositories/implementations/UsersRepository';
import IDeleteUserDTO from './DeleteUserDTO';

import RequestError from '../../../utils/RequestError';

export default class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: IDeleteUserDTO): Promise<void> {
    if (data.authId !== data.id) {
      throw RequestError.DELETE_NOT_USER;
    }
    delete data.authId;

    this.usersRepository.delete(data.id);
  }
}
