import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UsersRepository from '../../../repositories/implementations/UsersRepository';
import ICreateSessionDTO from './CreateSessionDTO';
import User from '../../../entities/User';

import RequestError from '../../../utils/RequestError';

export default class CreateSessionUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    data: ICreateSessionDTO,
  ): Promise<{
    token: string;
    user: Omit<User, 'password' | 'salt'>;
  }> {
    const user = await this.usersRepository.findByEmail(data.email);

    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      throw RequestError.INVALID_CREDENTIAL;
    }

    delete user.password;
    delete user.salt;

    const token = jwt.sign({ ...user }, process.env.SECRET || 'SECRET');

    return { token, user };
  }
}
