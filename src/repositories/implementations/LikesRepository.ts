import ILikesRepository from '../ILikesRepository';
import Like from '../../entities/Like';
import User from '../../entities/User';
import Post from '../../entities/Post';
import knex from '../../database';

interface LikeQuery {
  like_id: string;
  like_createdAt: Date;
  user_id: string;
  user_name: string;
  user_tag: string;
  user_createdAt: Date;
  user_updatedAt: Date;
  post_id: string;
  post_text: string;
  post_createdAt: Date;
  post_updatedAt: Date;
  post_author_id: string;
  post_author_name: string;
  post_author_tag: string;
  post_author_createdAt: Date;
  post_author_updatedAt: Date;
}

export default class LikesRepository implements ILikesRepository {
  private baseSelectQuery = knex
    .select<LikeQuery[]>([
      'likes.id as like_id',
      'likes.createdAt as like_createdAt',
      'user.id as user_id',
      'user.name as user_name',
      'user.tag as user_tag',
      'user.createdAt as user_createdAt',
      'user.updatedAt as user_updatedAt',
      'post.id as post_id',
      'post.text as post_text',
      'post.createdAt as post_createdAt',
      'post.updatedAt as post_updatedAt',
      'post_author.id as post_author_id',
      'post_author.name as post_author_name',
      'post_author.tag as post_author_tag',
      'post_author.createdAt as post_author_createdAt',
      'post_author.updatedAt as post_author_updatedAt',
    ])
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

  private parseLike = (like: LikeQuery) => {
    return new Like({
      id: like.like_id,
      createdAt: like.like_createdAt,
      user: {
        id: like.user_id,
        name: like.user_name,
        tag: like.user_tag,
        createdAt: like.user_createdAt,
        updatedAt: like.user_updatedAt,
      },
      post: {
        id: like.post_id,
        text: like.post_text,
        createdAt: like.post_createdAt,
        updatedAt: like.post_updatedAt,
        author: {
          id: like.post_author_id,
          name: like.post_author_name,
          tag: like.post_author_tag,
          createdAt: like.post_author_createdAt,
          updatedAt: like.post_author_updatedAt,
        },
      },
    });
  };

  async findByPair(user: User, post: Post): Promise<Like | undefined> {
    const like = await this.baseSelectQuery
      .clone()
      .where({ 'user.id': user.id, 'post.id': post.id })
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
      .returning('id')
      .innerJoin('users as user', 'user.id', 'likes.userId');

    const createdLike = (await this.baseSelectQuery
      .clone()
      .where({ 'likes.id': id })
      .first()) as LikeQuery;

    return this.parseLike(createdLike);
  }
}
