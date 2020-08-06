import RevocationsRepository from '../../../repositories/implementations/RevocationsRepository';
import IDeleteSessionDTO from './DeleteSessionDTO';
import Revoke from '../../../entities/Revoke';

export default class CreateSessionUseCase {
  constructor(private revocationsRepository: RevocationsRepository) {}

  async execute(data: IDeleteSessionDTO): Promise<void> {
    const revoke = new Revoke({ token: data.token });

    await this.revocationsRepository.save(revoke);
  }
}
