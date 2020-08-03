import IUserRepository from '../../../repositories/IUsersRepository';
import IIndexUserDTO from './IndexUserDTO';
import User from '../../../entities/User';

export default class IndexUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    data: IIndexUserDTO,
  ): Promise<{
    users: Omit<User, 'email' | 'password' | 'salt' | 'deletedAt'>[];
    count: number;
    pages: number;
  }> {
    let query: {
      users: Omit<User, 'email' | 'password' | 'salt' | 'deletedAt'>[];
      count: number;
      pages: number;
    };

    if (data.leading) {
      query = await this.userRepository.leading(data.page, data.perPage);
    } else {
      query = await this.userRepository.index(data.page, data.perPage);
    }

    return {
      users: query.users.map((user) => ({
        id: user.id,
        name: user.name,
        tag: user.tag,
        followers: user.followers,
        following: user.following,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
      count: query.count,
      pages: query.pages,
    };
  }
}
