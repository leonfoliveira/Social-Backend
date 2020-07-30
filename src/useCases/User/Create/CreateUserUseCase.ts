import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateUserRequestDTO from './CreateUserDTO';
import User from '../../../entities/User';

import RequestError from '../../../utils/RequestError';

export default class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(
    data: ICreateUserRequestDTO,
  ): Promise<
    Omit<User, 'email' | 'password' | 'salt' | 'updatedAt' | 'deletedAt'>
  > {
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

    const { id, name, tag, createdAt } = await this.usersRepository.save(user);

    return { id, name, tag, createdAt };
  }
}
