import IUserRepository from '../../../repositories/IUsersRepository';
import ITrendUserDTO from './TrendUserDTO';
import User from '../../../entities/User';

export default class TrendUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    data: ITrendUserDTO,
  ): Promise<{
    users: Omit<User, 'email' | 'password' | 'salt'>[];
    count: number;
    pages: number;
  }> {
    const trend = await this.userRepository.trend(data.page, data.perPage);

    trend.users = trend.users.map((user) => {
      delete user.email;
      delete user.password;
      delete user.salt;

      return user;
    });

    return trend;
  }
}
