import UsersRepository from '../../../repositories/implementations/UsersRepository';
import IUpdateUserDTO from './UpdateUserDTO';
import User from '../../../entities/User';

import RequestError from '../../../utils/RequestError';

export default class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    data: IUpdateUserDTO,
  ): Promise<Omit<User, 'password' | 'salt' | 'deletedAt'>> {
    if (data.authId !== data.id) {
      throw RequestError.UPDATE_NOT_USER;
    }
    delete data.authId;

    if (!data.email && !data.name && !data.password) {
      throw RequestError.EMPTY_UPDATE_BODY;
    }

    if (data.email) {
      const emailAlreadyExists = await this.usersRepository.findByEmail(
        data.email,
      );

      if (emailAlreadyExists) {
        throw RequestError.REPEATED_EMAIL;
      }
    }

    const user = new User(data);
    user.updatedAt = new Date();

    const updatedUser = await this.usersRepository.update(user.id, user);

    return updatedUser;
  }
}
