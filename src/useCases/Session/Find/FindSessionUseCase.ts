import UsersRepository from '../../../repositories/implementations/UsersRepository';
import IFindSessionDTO from './FindSessionDTO';
import User from '../../../entities/User';

import RequestError from '../../../utils/RequestError';

export default class FindSessionUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    data: IFindSessionDTO,
  ): Promise<Omit<User, 'password' | 'salt'> | void> {
    const user = await this.usersRepository.findById(data.authId);

    if (!user) {
      throw RequestError.USER_NOT_FOUND;
    }

    delete user.password;
    delete user.salt;

    return user;
  }
}
