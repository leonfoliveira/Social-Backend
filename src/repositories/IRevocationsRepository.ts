import Revoke from '../entities/Revoke';

export default interface IUsersRepository {
  findByToken(token: string): Promise<Revoke | undefined>;

  save(revoke: Revoke): Promise<void>;
}
