import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateUserDTO from './CreateUserDTO';
import User from '../../../entities/User';

import RequestError from '../../../utils/RequestError';

export default class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(
      data.email,
    );

    if (emailAlreadyExists) {
      throw RequestError.REPEATED_EMAIL;
    }

    const tagAlreadyExists = await this.usersRepository.findByTag(data.tag);

    if (tagAlreadyExists) {
      throw RequestError.REPEATED_TAG;
    }

    const user = new User(data);

    await this.usersRepository.save(user);
  }
}
