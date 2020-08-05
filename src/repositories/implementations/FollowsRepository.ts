import IFollowsRepository from '../IFollowsRepository';
import Follow from '../../entities/Follow';
import knex from '../../database';

interface IFollowQuery {
  follow_id: string;
  follow_createdAt: Date;
  follower_id: string;
  follower_name: string;
  follower_tag: string;
  follower_image: string;
  follower_createdAt: Date;
  follower_updatedAt: Date;
  target_id: string;
  target_name: string;
  target_tag: string;
  target_image: string;
  target_createdAt: Date;
  target_updatedAt: Date;
}

export default class FollowsRepository implements IFollowsRepository {
  private baseQuery = knex
    .from('follows')
    .innerJoin('users as follower', 'follower.id', 'follows.followerId')
    .innerJoin('users as target', 'target.id', 'follows.targetId')
    .where({
      'follows.deletedAt': null,
      'follower.deletedAt': null,
      'target.deletedAt': null,
    });

  private baseSelectQuery = this.baseQuery
    .clone()
    .select<IFollowQuery[]>([
      'follows.id as follow_id',
      'follows.createdAt as follow_createdAt',

      'follower.id as follower_id',
      'follower.name as follower_name',
      'follower.tag as follower_tag',
      'follower.image as follower_image',
      'follower.createdAt as follower_createdAt',
      'follower.updatedAt as follower_updatedAt',

      'target.id as target_id',
      'target.name as target_name',
      'target.tag as target_tag',
      'target.image as target_image',
      'target.createdAt as target_createdAt',
      'target.updatedAt as target_updatedAt',
    ]);

  private baseCountQuery = this.baseQuery
    .clone()
    .count()
    .first<{ count: number }>();

  private parseFollow = (follow: IFollowQuery): Follow =>
    new Follow({
      id: follow.follow_id,
      createdAt: follow.follow_createdAt,
      follower: {
        id: follow.follower_id,
        name: follow.follower_name,
        tag: follow.follower_tag,
        image: follow.follower_image,
        createdAt: follow.follower_createdAt,
        updatedAt: follow.follower_updatedAt,
      },
      target: {
        id: follow.target_id,
        name: follow.target_name,
        tag: follow.target_tag,
        image: follow.target_image,
        createdAt: follow.target_createdAt,
        updatedAt: follow.target_updatedAt,
      },
    });

  async index(
    page: number,
    perPage: number,
  ): Promise<{ follows: Follow[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * perPage;

    const follows = await this.baseSelectQuery
      .clone()
      .limit(limit)
      .offset(offset);

    const parsedFollows = follows.map((follow) => this.parseFollow(follow));

    const { count } = await this.baseCountQuery.clone();

    return { follows: parsedFollows, count, pages: Math.ceil(count / perPage) };
  }

  async indexByFollower(
    page: number,
    perPage: number,
    followerId: string,
  ): Promise<{ follows: Follow[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * perPage;

    const follows = await this.baseSelectQuery
      .clone()
      .where({ 'follows.followerId': followerId })
      .limit(limit)
      .offset(offset);

    const parsedFollows = follows.map((follow) => this.parseFollow(follow));

    const { count } = await this.baseCountQuery.clone().where({
      'follows.followerId': followerId,
    });

    return { follows: parsedFollows, count, pages: Math.ceil(count / perPage) };
  }

  async indexByTarget(
    page: number,
    perPage: number,
    targetId: string,
  ): Promise<{ follows: Follow[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * perPage;

    const follows = await this.baseSelectQuery
      .clone()
      .where({ 'follows.targetId': targetId })
      .limit(limit)
      .offset(offset);

    const parsedFollows = follows.map((follow) => this.parseFollow(follow));

    const { count } = await this.baseCountQuery.clone().where({
      'follows.targetId': targetId,
    });

    return { follows: parsedFollows, count, pages: Math.ceil(count / perPage) };
  }

  async findById(id: string): Promise<Follow | undefined> {
    const follow = await this.baseSelectQuery
      .clone()
      .where({ 'follows.id': id })
      .first();

    if (!follow) return undefined;

    return this.parseFollow(follow);
  }

  async findByPair(
    followerId: string,
    targetId: string,
  ): Promise<Follow | undefined> {
    const follow = await this.baseSelectQuery
      .clone()
      .where({ 'follower.id': followerId, 'target.id': targetId })
      .first();

    if (!follow) return undefined;

    return this.parseFollow(follow);
  }

  async save(follow: Follow): Promise<Follow> {
    const { id: followerId } = follow.follower;
    const { id: targetId } = follow.target;

    const [id] = await knex
      .insert({ id: follow.id, followerId, targetId })
      .into('follows')
      .returning('id');

    const createdFollow = (await this.baseSelectQuery
      .clone()
      .where({ 'follows.id': id })
      .first()) as IFollowQuery;

    return this.parseFollow(createdFollow);
  }

  async delete(id: string): Promise<void> {
    await knex('follows').update({ deletedAt: new Date() }).where({ id });
  }
}
