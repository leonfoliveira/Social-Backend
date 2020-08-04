import UsersRepository from '../../../repositories/implementations/UsersRepository';
import IFindUserDTO from './FindUserDTO';
import User from '../../../entities/User';

import RequestError from '../../../utils/RequestError';

export default class FindUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    data: IFindUserDTO,
  ): Promise<Omit<User, 'email' | 'password' | 'salt'>> {
    const user = await this.usersRepository.findById(data.id);

    if (!user) {
      throw RequestError.USER_NOT_FOUND;
    }

    delete user.email;
    delete user.password;
    delete user.salt;

    return user;
  }
}
