import IFollowsRepository from '../IFollowsRepository';
import Follow from '../../entities/Follow';
import User from '../../entities/User';
import knex from '../../database';

interface FollowQuery {
  follow_id: string;
  follow_createdAt: Date;
  follower_id: string;
  follower_name: string;
  follower_tag: string;
  follower_createdAt: Date;
  follower_updatedAt: Date;
  target_id: string;
  target_name: string;
  target_tag: string;
  target_createdAt: Date;
  target_updatedAt: Date;
}

export default class FollowsRepository implements IFollowsRepository {
  private baseSelectQuery = knex
    .select<FollowQuery[]>([
      'follows.id as follow_id',
      'follows.createdAt as follow_createdAt',
      'follower.id as follower_id',
      'follower.name as follower_name',
      'follower.tag as follower_tag',
      'follower.createdAt as follower_createdAt',
      'follower.updatedAt as follower_updatedAt',
      'target.id as target_id',
      'target.name as target_name',
      'target.tag as target_tag',
      'target.createdAt as target_createdAt',
      'target.updatedAt as target_updatedAt',
    ])
    .from('follows')
    .innerJoin('users as follower', 'follower.id', 'follows.followerId')
    .innerJoin('users as target', 'target.id', 'follows.targetId')
    .where({
      'follows.deletedAt': null,
      'follower.deletedAt': null,
      'target.deletedAt': null,
    });

  private parseFollow = (follow: FollowQuery) => {
    return new Follow({
      id: follow.follow_id,
      createdAt: follow.follow_createdAt,
      follower: {
        id: follow.follower_id,
        name: follow.follower_name,
        tag: follow.follower_tag,
        createdAt: follow.follower_createdAt,
        updatedAt: follow.follower_updatedAt,
      },
      target: {
        id: follow.target_id,
        name: follow.target_name,
        tag: follow.target_tag,
        createdAt: follow.target_createdAt,
        updatedAt: follow.target_updatedAt,
      },
    });
  };

  async findById(id: string): Promise<Follow | undefined> {
    const follow = await this.baseSelectQuery
      .clone()
      .where({ 'follows.id': id })
      .first();

    if (!follow) return undefined;

    return this.parseFollow(follow);
  }

  async findByPair(follower: User, target: User): Promise<Follow | undefined> {
    const follow = await this.baseSelectQuery
      .clone()
      .where({ 'follower.id': follower.id, 'target.id': target.id })
      .first();

    if (!follow) return undefined;

    return this.parseFollow(follow);
  }

  async save(follow: Follow): Promise<Follow> {
    const { id: followerId } = follow.follower;
    const { id: targetId } = follow.target;

    const [createdFollow] = await knex
      .insert({ id: follow.id, followerId, targetId })
      .into('follows')
      .returning(['id', 'createdAt']);

    const follower = await knex
      .select<User>(['id', 'name', 'tag', 'createdAt', 'updatedAt'])
      .from('users')
      .where({ id: followerId })
      .first();
    const target = await knex
      .select<User>(['id', 'name', 'tag', 'createdAt', 'updatedAt'])
      .from('users')
      .where({ id: targetId })
      .first();

    return new Follow({ ...createdFollow, follower, target });
  }
}
