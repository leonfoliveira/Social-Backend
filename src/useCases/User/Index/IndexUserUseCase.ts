import IUserRepository from '../../../repositories/IUsersRepository';
import IIndexUserDTO from './IndexUserDTO';
import User from '../../../entities/User';

export default class IndexUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    data: IIndexUserDTO,
  ): Promise<{
    users: Omit<User, 'email' | 'password' | 'salt'>[];
    count: number;
    pages: number;
  }> {
    let index: {
      users: User[];
      count: number;
      pages: number;
    };

    if (data.leading) {
      index = await this.userRepository.leading(data.page, data.perPage);
    } else {
      index = await this.userRepository.index(data.page, data.perPage);
    }

    index.users = index.users.map((user) => {
      delete user.email;
      delete user.password;
      delete user.salt;

      return user;
    });

    return index;
  }
}
