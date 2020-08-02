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
    const { users, count, pages } = await this.userRepository.index(
      data.page,
      data.perPage,
    );

    return {
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        tag: user.tag,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
      count,
      pages,
    };
  }
}
