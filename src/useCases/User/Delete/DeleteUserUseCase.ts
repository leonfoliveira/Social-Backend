import fs from 'fs';
import UsersRepository from '../../../repositories/implementations/UsersRepository';
import IDeleteUserDTO from './DeleteUserDTO';
import User from '../../../entities/User';

export default class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: IDeleteUserDTO): Promise<void> {
    const oldUser = (await this.usersRepository.findById(data.id)) as User;

    if (!oldUser.image.includes('default.png')) {
      fs.unlinkSync(oldUser.image.replace('static', 'public'));
    }

    await this.usersRepository.delete(data.id);
  }
}
