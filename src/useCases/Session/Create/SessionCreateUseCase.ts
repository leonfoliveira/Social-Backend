import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UsersRepository from '../../../repositories/implementations/UsersRepository';
import ISessionCreateDTO from './SessionCreateDTO';
import User from '../../../entities/User';

import RequestError from '../../../utils/RequestError';

export default class SessionCreateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    data: ISessionCreateDTO,
  ): Promise<{
    token: string;
    user: Omit<User, 'password' | 'salt' | 'deletedAt'>;
  }> {
    const userExists = await this.usersRepository.findByEmail(data.email);

    if (
      !userExists ||
      !bcrypt.compareSync(data.password, userExists.password)
    ) {
      throw RequestError.INVALID_CREDENTIAL;
    }

    const user = {
      id: userExists.id,
      email: userExists.email,
      tag: userExists.tag,
      name: userExists.name,
      createdAt: userExists.createdAt,
      updatedAt: userExists.updatedAt,
    };

    const token = jwt.sign(user, process.env.SECRET || 'SECRET');

    return { token, user };
  }
}
