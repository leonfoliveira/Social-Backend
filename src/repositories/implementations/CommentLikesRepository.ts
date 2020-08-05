import ICommentLikesRepository from '../ICommentLikesRepository';
import CommentLike from '../../entities/CommentLike';
import knex from '../../database';

interface ICommentLikeQuery {
  comment_like_id: string;
  comment_like_createdAt: Date;
  user_id: string;
  user_name: string;
  user_tag: string;
  user_image: string;
  user_createdAt: Date;
  user_updatedAt: Date;
  comment_id: string;
  comment_text: string;
  comment_createdAt: Date;
  comment_updatedAt: Date;
  comment_user_id: string;
  comment_user_name: string;
  comment_user_tag: string;
  comment_user_image: string;
  comment_user_createdAt: Date;
  comment_user_updatedAt: Date;
  comment_post_id: string;
  comment_post_text: string;
  comment_post_image: string;
  comment_post_createdAt: Date;
  comment_post_updatedAt: Date;
  comment_post_author_id: string;
  comment_post_author_name: string;
  comment_post_author_tag: string;
  comment_post_author_image: string;
  comment_post_author_createdAt: Date;
  comment_post_author_updatedAt: Date;
}

export default class LikesRepository implements ICommentLikesRepository {
  private baseQuery = knex
    .from('comment_likes')
    .innerJoin('users as user', 'user.id', 'comment_likes.userId')
    .innerJoin('comments as comment', 'comment.id', 'comment_likes.commentId')
    .innerJoin('users as comment_user', 'comment_user.id', 'comment.userId')
    .innerJoin('posts as comment_post', 'comment_post.id', 'comment.postId')
    .innerJoin(
      'users as comment_post_author',
      'comment_post_author.id',
      'comment_post.authorId',
    )
    .where({
      'comment_likes.deletedAt': null,
      'user.deletedAt': null,
      'comment.deletedAt': null,
      'comment_user.deletedAt': null,
      'comment_post.deletedAt': null,
      'comment_post_author.deletedAt': null,
    });

  private baseSelectQuery = this.baseQuery
    .clone()
    .select<ICommentLikeQuery[]>([
      'comment_likes.id as comment_likes_id',
      'comment_likes.createdAt as comment_likes_createdAt',

      'user.id as user_id',
      'user.name as user_name',
      'user.tag as user_tag',
      'user.image as user_image',
      'user.createdAt as user_createdAt',
      'user.updatedAt as user_updatedAt',
      'comment.id as comment_id',
      'comment.text as comment_text',
      'comment.createdAt as comment_createdAt',
      'comment.updatedAt as comment_updatedAt',

      'comment_user.id as comment_user_id',
      'comment_user.name as comment_user_name',
      'comment_user.tag as comment_user_tag',
      'comment_user.image as comment_user_image',
      'comment_user.createdAt as comment_user_createdAt',
      'comment_user.updatedAt as comment_user_updatedAt',

      'comment_post.id as comment_post_id',
      'comment_post.text as comment_post_text',
      'comment_post.image as comment_post_image',
      'comment_post.createdAt as comment_post_createdAt',
      'comment_post.updatedAt as comment_post_updatedAt',

      'comment_post_author.id as comment_post_author_id',
      'comment_post_author.name as comment_post_author_name',
      'comment_post_author.tag as comment_post_author_tag',
      'comment_post_author.image as comment_post_author_image',
      'comment_post_author.createdAt as comment_post_author_createdAt',
      'comment_post_author.updatedAt as comment_post_author_updatedAt',
    ]);

  private baseCountQuery = this.baseQuery
    .clone()
    .count()
    .first<{ count: number }>();

  private parseCommentLike = (commentLike: ICommentLikeQuery): CommentLike =>
    new CommentLike({
      id: commentLike.comment_like_id,
      user: {
        id: commentLike.user_id,
        name: commentLike.user_name,
        tag: commentLike.user_tag,
        image: commentLike.user_image,
        createdAt: commentLike.user_createdAt,
        updatedAt: commentLike.user_updatedAt,
      },
      comment: {
        id: commentLike.comment_id,
        text: commentLike.comment_text,
        createdAt: commentLike.comment_createdAt,
        updatedAt: commentLike.comment_updatedAt,
        user: {
          id: commentLike.comment_user_id,
          name: commentLike.comment_user_name,
          tag: commentLike.comment_user_tag,
          image: commentLike.comment_user_image,
          createdAt: commentLike.comment_user_createdAt,
          updatedAt: commentLike.comment_user_updatedAt,
        },
        post: {
          id: commentLike.comment_post_id,
          text: commentLike.comment_post_text,
          image: commentLike.comment_post_image,
          author: {
            id: commentLike.comment_post_author_id,
            name: commentLike.comment_post_author_name,
            tag: commentLike.comment_post_author_tag,
            image: commentLike.comment_post_author_image,
            createdAt: commentLike.comment_post_author_createdAt,
            updatedAt: commentLike.comment_post_author_updatedAt,
          },
          createdAt: commentLike.comment_post_createdAt,
          updatedAt: commentLike.comment_post_updatedAt,
        },
      },
      createdAt: commentLike.comment_like_createdAt,
    });

  async index(
    page: number,
    perPage: number,
  ): Promise<{
    commentLikes: CommentLike[];
    count: number;
    pages: number;
  }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const commentLikes = await this.baseSelectQuery
      .clone()
      .limit(limit)
      .offset(offset);

    const parsedCommentLikes = commentLikes.map((commentLike) =>
      this.parseCommentLike(commentLike),
    );

    const { count } = await this.baseCountQuery.clone();

    return {
      commentLikes: parsedCommentLikes,
      count,
      pages: Math.ceil(count / perPage),
    };
  }

  async indexByUser(
    page: number,
    perPage: number,
    userId: string,
  ): Promise<{ commentLikes: CommentLike[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const CommentLikes = await this.baseSelectQuery
      .clone()
      .where({ 'user.id': userId })
      .limit(limit)
      .offset(offset);

    const parsedCommentLikes = CommentLikes.map((CommentLike) =>
      this.parseCommentLike(CommentLike),
    );

    const { count } = await this.baseCountQuery.clone().where({
      'user.id': userId,
    });

    return {
      commentLikes: parsedCommentLikes,
      count,
      pages: Math.ceil(count / perPage),
    };
  }

  async indexByComment(
    page: number,
    perPage: number,
    commentId: string,
  ): Promise<{ commentLikes: CommentLike[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const CommentLlikes = await this.baseSelectQuery
      .clone()
      .where({ 'comment.id': commentId })
      .limit(limit)
      .offset(offset);

    const parsedLikes = CommentLlikes.map((CommentLike) =>
      this.parseCommentLike(CommentLike),
    );

    const { count } = await this.baseCountQuery.clone().where({
      'comment.id': commentId,
    });

    return {
      commentLikes: parsedLikes,
      count,
      pages: Math.ceil(count / perPage),
    };
  }

  async findById(id: string): Promise<CommentLike | undefined> {
    const CommentLike = await this.baseSelectQuery
      .clone()
      .where({ 'comment_likes.id': id })
      .first();

    if (!CommentLike) return undefined;

    return this.parseCommentLike(CommentLike);
  }

  async findByPair(
    userId: string,
    commentId: string,
  ): Promise<CommentLike | undefined> {
    const CommentLike = await this.baseSelectQuery
      .clone()
      .where({ 'user.id': userId, 'comment.id': commentId })
      .first();

    if (!CommentLike) return undefined;

    return this.parseCommentLike(CommentLike);
  }

  async save(commentLike: CommentLike): Promise<CommentLike> {
    const { id: userId } = commentLike.user;
    const { id: commentId } = commentLike.comment;

    const [id] = await knex
      .insert({ id: commentLike.id, userId, commentId })
      .into('comment_likes')
      .returning('id');

    const createdLike = (await this.baseSelectQuery
      .clone()
      .where({ 'comment_likes.id': id })
      .first()) as ICommentLikeQuery;

    return this.parseCommentLike(createdLike);
  }

  async delete(id: string): Promise<void> {
    await knex('comment_likes').update({ deletedAt: new Date() }).where({ id });
  }
}
