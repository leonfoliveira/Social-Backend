import fs from 'fs';
import UsersRepository from '../../../repositories/implementations/UsersRepository';
import IUpdateUserDTO from './UpdateUserDTO';
import User from '../../../entities/User';

import RequestError from '../../../utils/RequestError';

export default class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    data: IUpdateUserDTO,
  ): Promise<Omit<User, 'password' | 'salt'>> {
    const oldUser = (await this.usersRepository.findById(data.id)) as User;

    if (data.authId !== data.id) {
      throw RequestError.UPDATE_USER_NOT_OWNER;
    }
    delete data.authId;

    if (!data.email && !data.name && !data.password && !data.image) {
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

    const user = new User({
      ...data,
      image: data.image?.replace('public', 'static'),
    });
    user.updatedAt = new Date();

    const updatedUser = await this.usersRepository.update(data.id, user);

    delete updatedUser.password;
    delete updatedUser.salt;

    if (data.image && !oldUser.image.includes('default.png')) {
      fs.unlinkSync(oldUser.image.replace('static', 'public'));
    }

    return updatedUser;
  }
}
