import IUsersRepository from '../IUsersRepository';
import User from '../../entities/User';
import knex from '../../database';

interface UserQuery {
  id: string;
  email?: string;
  name: string;
  tag: string;
  password: string;
  salt: string;
  followers: string;
  following: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class UsersRepository implements IUsersRepository {
  private baseQuery = knex
    .from('users')
    .leftJoin(
      knex
        .select('targetId')
        .count('* as followers')
        .from('follows')
        .innerJoin(
          'users as followers_counter_user',
          'followers_counter_user.id',
          'follows.followerId',
        )
        .where({
          'follows.deletedAt': null,
          'followers_counter_user.deletedAt': null,
        })
        .groupBy('targetId')
        .as('followers_counter'),
      'followers_counter.targetId',
      'users.id',
    )
    .leftJoin(
      knex
        .select('followerId')
        .count('* as following')
        .from('follows')
        .innerJoin(
          'users as following_counter_user',
          'following_counter_user.id',
          'follows.targetId',
        )
        .where({
          'follows.deletedAt': null,
          'following_counter_user.deletedAt': null,
        })
        .groupBy('followerId')
        .as('following_counter'),
      'following_counter.followerId',
      'users.id',
    )
    .where({ deletedAt: null });

  private baseSelectQuery = this.baseQuery
    .clone()
    .select<UserQuery[]>([
      'users.id',
      'users.email',
      'users.name',
      'users.tag',
      'users.password',
      'users.salt',
      'followers',
      'following',
      'users.createdAt',
      'users.updatedAt',
    ]);

  private baseCountQuery = this.baseQuery
    .clone()
    .count()
    .first<{ count: number }>();

  private parseUser = (user: UserQuery): User =>
    new User({
      ...user,
      followers: user.followers ? parseInt(user.followers, 10) : 0,
      following: user.following ? parseInt(user.following, 10) : 0,
    });

  async index(
    page: number,
    perPage: number,
  ): Promise<{ users: User[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const users = await this.baseSelectQuery
      .clone()
      .limit(limit)
      .offset(offset);

    const { count } = await this.baseCountQuery.clone();

    return {
      users: users.map((user) => this.parseUser(user)),
      count,
      pages: Math.ceil(count / perPage),
    };
  }

  async trend(
    page: number,
    perPage: number,
    time: number,
  ): Promise<{ users: User[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const users = await this.baseSelectQuery
      .clone()
      .leftJoin(
        knex
          .select('targetId')
          .count('* as last_followers')
          .from('follows')
          .innerJoin(
            'users as followers_counter_user',
            'followers_counter_user.id',
            'follows.followerId',
          )
          .where({
            'follows.deletedAt': null,
            'followers_counter_user.deletedAt': null,
          })
          .andWhere('follows.createdAt', '>', new Date(Date.now() - time))
          .groupBy('targetId')
          .as('last_followers_counter'),
        'last_followers_counter.targetId',
        'users.id',
      )
      .orderByRaw('last_followers DESC NULLS LAST, "createdAt" DESC')
      .limit(limit)
      .offset(offset);

    const { count } = await this.baseCountQuery
      .whereNotNull('followers')
      .clone();

    return {
      users: users.map((user) => this.parseUser(user)),
      count,
      pages: Math.ceil(count / perPage),
    };
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.baseSelectQuery
      .clone()
      .where({ id, deletedAt: null })
      .first();

    if (!user) {
      return undefined;
    }

    return this.parseUser(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.baseSelectQuery
      .clone()
      .where({ email, deletedAt: null })
      .first();

    if (!user) {
      return undefined;
    }

    return this.parseUser(user);
  }

  async findByTag(tag: string): Promise<User | undefined> {
    const user = await this.baseSelectQuery
      .clone()
      .where({ tag, deletedAt: null })
      .first();

    if (!user) {
      return undefined;
    }

    return this.parseUser(user);
  }

  async save(user: User): Promise<User> {
    delete user.followers;
    delete user.following;

    const [id] = await knex
      .insert(user)
      .into('users')
      .returning<UserQuery[]>('id');

    const createdUser = (await this.baseSelectQuery
      .clone()
      .where({ 'users.id': id })
      .first()) as UserQuery;

    return this.parseUser(createdUser);
  }

  async update(id: string, user: User): Promise<User> {
    await knex('users')
      .update({
        email: user.email ?? user.email,
        name: user.name ?? user.name,
        password: user.password ?? user.password,
        salt: user.salt ?? user.salt,
      })
      .where({ id, deletedAt: null });

    const updatedUser = (await this.baseSelectQuery
      .clone()
      .where({ 'users.id': id })
      .first()) as UserQuery;

    return this.parseUser(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await knex('users')
      .update({ deletedAt: new Date() })
      .where({ id, deletedAt: null });
  }
}
