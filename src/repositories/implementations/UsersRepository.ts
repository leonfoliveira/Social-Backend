import IUsersRepository from '../IUsersRepository';
import User from '../../entities/User';
import knex from '../../database';

interface UserQuery {
  id: string;
  email?: string;
  name: string;
  tag: string;
  followers: string;
  following: string;
  password?: string;
  salt?: string;
  createdAt: Date;
  deletedAt: Date;
}

export default class UsersRepository implements IUsersRepository {
  private baseSelectQuery = knex
    .select<UserQuery[]>(['users.*', 'followers', 'following'])
    .from('users')
    .leftJoin(
      knex
        .select('targetId')
        .count('* as followers')
        .from('follows')
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
        .groupBy('followerId')
        .as('following_counter'),
      'following_counter.followerId',
      'users.id',
    )
    .where({ deletedAt: null });

  private parseUser(user: UserQuery): User {
    return new User({
      ...user,
      followers: user.followers ? parseInt(user.followers, 10) : 0,
      following: user.following ? parseInt(user.following, 10) : 0,
    });
  }

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

    const { count } = await knex
      .count()
      .from('users')
      .where({ deletedAt: null })
      .first<{ count: number }>();

    return {
      users: users.map((user) => this.parseUser(user)),
      count,
      pages: Math.ceil(count / perPage),
    };
  }

  async leading(
    page: number,
    perPage: number,
  ): Promise<{ users: User[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const users = await this.baseSelectQuery
      .clone()
      .whereNotNull('followers')
      .orderBy('followers', 'desc')
      .limit(limit)
      .offset(offset);

    const { count } = await knex
      .count()
      .from('users')
      .where({ deletedAt: null })
      .first<{ count: number }>();

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
    const [createdUser] = await knex
      .insert({
        id: user.id,
        email: user.email,
        name: user.name,
        tag: user.tag,
        password: user.password,
        salt: user.salt,
      })
      .into('users')
      .returning<UserQuery[]>([
        'id',
        'email',
        'name',
        'tag',
        'createdAt',
        'updatedAt',
      ]);

    return this.parseUser(createdUser);
  }

  async update(id: string, user: User): Promise<User> {
    const [updatedUser] = await knex('users')
      .update({
        email: user.email ?? user.email,
        name: user.name ?? user.name,
        password: user.password ?? user.password,
        salt: user.salt ?? user.salt,
      })
      .where({ id, deletedAt: null })
      .returning<UserQuery[]>('*');

    const { count: followers } = await knex
      .count()
      .from('follows')
      .where({ targetId: id })
      .first<{ count: string }>();

    const { count: following } = await knex
      .count()
      .from('follows')
      .where({ followerId: id })
      .first<{ count: string }>();

    return this.parseUser({ ...updatedUser, followers, following });
  }

  async delete(id: string): Promise<void> {
    await knex('users')
      .update({ deletedAt: new Date() })
      .where({ id, deletedAt: null });
  }
}
