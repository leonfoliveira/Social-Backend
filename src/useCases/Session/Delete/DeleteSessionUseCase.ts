import RevocationsRepository from '../../../repositories/implementations/RevocationsRepository';
import IDeleteSessionDTO from './DeleteSessionDTO';
import Revoke from '../../../entities/Revoke';

import RequestError from '../../../utils/RequestError';

export default class CreateSessionUseCase {
  constructor(private revocationsRepository: RevocationsRepository) {}

  async execute(data: IDeleteSessionDTO): Promise<void> {
    if (data.authToken !== data.token) {
      throw RequestError.REVOKE_OTHER_TOKEN;
    }

    const revoke = new Revoke({ token: data.token });

    await this.revocationsRepository.save(revoke);
  }
}
