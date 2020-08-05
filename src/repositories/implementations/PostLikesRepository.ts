import IPostLikesRepository from '../IPostLikesRepository';
import PostLike from '../../entities/PostLike';
import knex from '../../database';

interface IPostLikeQuery {
  post_like_id: string;
  post_like_createdAt: Date;
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

export default class LikesRepository implements IPostLikesRepository {
  private baseQuery = knex
    .from('post_likes')
    .innerJoin('users as user', 'user.id', 'post_likes.userId')
    .innerJoin('posts as post', 'post.id', 'post_likes.postId')
    .innerJoin('users as post_author', 'post_author.id', 'post.authorId')
    .where({
      'post_likes.deletedAt': null,
      'user.deletedAt': null,
      'post.deletedAt': null,
      'post_author.deletedAt': null,
    });

  private baseSelectQuery = this.baseQuery
    .clone()
    .select<IPostLikeQuery[]>([
      'post_likes.id as post_likes_id',
      'post_likes.createdAt as post_likes_createdAt',
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

  private parsePostLike = (postLike: IPostLikeQuery): PostLike =>
    new PostLike({
      id: postLike.post_like_id,
      createdAt: postLike.post_like_createdAt,
      user: {
        id: postLike.user_id,
        name: postLike.user_name,
        tag: postLike.user_tag,
        image: postLike.user_image,
        createdAt: postLike.user_createdAt,
        updatedAt: postLike.user_updatedAt,
      },
      post: {
        id: postLike.post_id,
        text: postLike.post_text,
        image: postLike.post_image,
        createdAt: postLike.post_createdAt,
        updatedAt: postLike.post_updatedAt,
        author: {
          id: postLike.post_author_id,
          name: postLike.post_author_name,
          tag: postLike.post_author_tag,
          image: postLike.post_author_image,
          createdAt: postLike.post_author_createdAt,
          updatedAt: postLike.post_author_updatedAt,
        },
      },
    });

  async index(
    page: number,
    perPage: number,
  ): Promise<{
    postLikes: PostLike[];
    count: number;
    pages: number;
  }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const postLikes = await this.baseSelectQuery
      .clone()
      .limit(limit)
      .offset(offset);

    const parsedLikes = postLikes.map((postLike) =>
      this.parsePostLike(postLike),
    );

    const { count } = await this.baseCountQuery.clone();

    return { postLikes: parsedLikes, count, pages: Math.ceil(count / perPage) };
  }

  async indexByUser(
    page: number,
    perPage: number,
    userId: string,
  ): Promise<{ postLikes: PostLike[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const postLikes = await this.baseSelectQuery
      .clone()
      .where({ 'user.id': userId })
      .limit(limit)
      .offset(offset);

    const parsedPostLikes = postLikes.map((postLike) =>
      this.parsePostLike(postLike),
    );

    const { count } = await this.baseCountQuery.clone().where({
      'user.id': userId,
    });

    return {
      postLikes: parsedPostLikes,
      count,
      pages: Math.ceil(count / perPage),
    };
  }

  async indexByPost(
    page: number,
    perPage: number,
    postId: string,
  ): Promise<{ postLikes: PostLike[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const postLlikes = await this.baseSelectQuery
      .clone()
      .where({ 'post.id': postId })
      .limit(limit)
      .offset(offset);

    const parsedLikes = postLlikes.map((postLike) =>
      this.parsePostLike(postLike),
    );

    const { count } = await this.baseCountQuery.clone().where({
      'post.id': postId,
    });

    return { postLikes: parsedLikes, count, pages: Math.ceil(count / perPage) };
  }

  async findById(id: string): Promise<PostLike | undefined> {
    const postLike = await this.baseSelectQuery
      .clone()
      .where({ 'post_likes.id': id })
      .first();

    if (!postLike) return undefined;

    return this.parsePostLike(postLike);
  }

  async findByPair(
    userId: string,
    postId: string,
  ): Promise<PostLike | undefined> {
    const postLike = await this.baseSelectQuery
      .clone()
      .where({ 'user.id': userId, 'post.id': postId })
      .first();

    if (!postLike) return undefined;

    return this.parsePostLike(postLike);
  }

  async save(postLike: PostLike): Promise<PostLike> {
    const { id: userId } = postLike.user;
    const { id: postId } = postLike.post;

    const [id] = await knex
      .insert({ id: postLike.id, userId, postId })
      .into('post_likes')
      .returning('id');

    const createdLike = (await this.baseSelectQuery
      .clone()
      .where({ 'post_likes.id': id })
      .first()) as IPostLikeQuery;

    return this.parsePostLike(createdLike);
  }

  async delete(id: string): Promise<void> {
    await knex('post_likes').update({ deletedAt: new Date() }).where({ id });
  }
}
