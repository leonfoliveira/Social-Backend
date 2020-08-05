import ILikesRepository from '../ILikesRepository';
import Like from '../../entities/Like';
import knex from '../../database';

interface LikeQuery {
  like_id: string;
  like_createdAt: Date;
  user_id: string;
  user_name: string;
  user_tag: string;
  user_image: string;
  user_createdAt: Date;
  user_updatedAt: Date;
  post_id: string;
  post_text: string;
  post_image: string;
  post_createdAt: Date;
  post_updatedAt: Date;
  post_author_id: string;
  post_author_name: string;
  post_author_tag: string;
  post_author_image: string;
  post_author_createdAt: Date;
  post_author_updatedAt: Date;
}

export default class LikesRepository implements ILikesRepository {
  private baseQuery = knex
    .from('likes')
    .innerJoin('users as user', 'user.id', 'likes.userId')
    .innerJoin('posts as post', 'post.id', 'likes.postId')
    .innerJoin('users as post_author', 'post_author.id', 'post.authorId')
    .where({
      'likes.deletedAt': null,
      'user.deletedAt': null,
      'post.deletedAt': null,
      'post_author.deletedAt': null,
    });

  private baseSelectQuery = this.baseQuery
    .clone()
    .select<LikeQuery[]>([
      'likes.id as like_id',
      'likes.createdAt as like_createdAt',
      'user.id as user_id',
      'user.name as user_name',
      'user.tag as user_tag',
      'user.image as user_image',
      'user.createdAt as user_createdAt',
      'user.updatedAt as user_updatedAt',
      'post.id as post_id',
      'post.text as post_text',
      'post.image as post_image',
      'post.createdAt as post_createdAt',
      'post.updatedAt as post_updatedAt',
      'post_author.id as post_author_id',
      'post_author.name as post_author_name',
      'post_author.tag as post_author_tag',
      'post_author.image as post_author_image',
      'post_author.createdAt as post_author_createdAt',
      'post_author.updatedAt as post_author_updatedAt',
    ]);

  private baseCountQuery = this.baseQuery
    .clone()
    .count()
    .first<{ count: number }>();

  private parseLike = (like: LikeQuery): Like =>
    new Like({
      id: like.like_id,
      createdAt: like.like_createdAt,
      user: {
        id: like.user_id,
        name: like.user_name,
        tag: like.user_tag,
        image: like.user_image,
        createdAt: like.user_createdAt,
        updatedAt: like.user_updatedAt,
      },
      post: {
        id: like.post_id,
        text: like.post_text,
        image: like.post_image,
        createdAt: like.post_createdAt,
        updatedAt: like.post_updatedAt,
        author: {
          id: like.post_author_id,
          name: like.post_author_name,
          tag: like.post_author_tag,
          image: like.post_author_image,
          createdAt: like.post_author_createdAt,
          updatedAt: like.post_author_updatedAt,
        },
      },
    });

  async index(
    page: number,
    perPage: number,
  ): Promise<{
    likes: Like[];
    count: number;
    pages: number;
  }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const likes = await this.baseSelectQuery
      .clone()
      .limit(limit)
      .offset(offset);

    const parsedLikes = likes.map((like) => this.parseLike(like));

    const { count } = await this.baseCountQuery.clone();

    return { likes: parsedLikes, count, pages: Math.ceil(count / perPage) };
  }

  async indexByUser(
    page: number,
    perPage: number,
    userId: string,
  ): Promise<{ likes: Like[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const likes = await this.baseSelectQuery
      .clone()
      .where({ 'user.id': userId })
      .limit(limit)
      .offset(offset);

    const parsedLikes = likes.map((like) => this.parseLike(like));

    const { count } = await this.baseCountQuery.clone().where({
      'user.id': userId,
    });

    return { likes: parsedLikes, count, pages: Math.ceil(count / perPage) };
  }

  async indexByPost(
    page: number,
    perPage: number,
    postId: string,
  ): Promise<{ likes: Like[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const likes = await this.baseSelectQuery
      .clone()
      .where({ 'post.id': postId })
      .limit(limit)
      .offset(offset);

    const parsedLikes = likes.map((like) => this.parseLike(like));

    const { count } = await this.baseCountQuery.clone().where({
      'post.id': postId,
    });

    return { likes: parsedLikes, count, pages: Math.ceil(count / perPage) };
  }

  async findById(id: string): Promise<Like | undefined> {
    const like = await this.baseSelectQuery
      .clone()
      .where({ 'likes.id': id })
      .first();

    if (!like) return undefined;

    return this.parseLike(like);
  }

  async findByPair(userId: string, postId: string): Promise<Like | undefined> {
    const like = await this.baseSelectQuery
      .clone()
      .where({ 'user.id': userId, 'post.id': postId })
      .first();

    if (!like) return undefined;

    return this.parseLike(like);
  }

  async save(like: Like): Promise<Like> {
    const { id: userId } = like.user;
    const { id: postId } = like.post;

    const [id] = await knex
      .insert({ id: like.id, userId, postId })
      .into('likes')
      .returning('id');

    const createdLike = (await this.baseSelectQuery
      .clone()
      .where({ 'likes.id': id })
      .first()) as LikeQuery;

    return this.parseLike(createdLike);
  }

  async delete(id: string): Promise<void> {
    await knex('likes').update({ deletedAt: new Date() }).where({ id });
  }
}
