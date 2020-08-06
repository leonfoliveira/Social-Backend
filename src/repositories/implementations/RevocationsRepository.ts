import IRevocationsRepository from '../IRevocationsRepository';
import Revoke from '../../entities/Revoke';
import knex from '../../database';

export default class RevocationsRepository implements IRevocationsRepository {
  async findByToken(token: string): Promise<Revoke | undefined> {
    const revoke = await knex
      .select<Revoke[]>('*')
      .from('revocations')
      .where({ token })
      .first();

    return revoke;
  }

  async save(revoke: Revoke): Promise<void> {
    await knex
      .insert({
        id: revoke.id,
        token: revoke.token,
      })
      .into('revocations');
  }
}
