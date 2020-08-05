import ICommentsRepository from '../ICommentsRepository';
import Comment from '../../entities/Comment';
import knex from '../../database';

interface ICommentQuery {
  comment_id: string;
  comment_text: string;
  comment_createdAt: Date;
  comment_updatedAt: Date;
  likes: string;
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

export default class CommentsRepository implements ICommentsRepository {
  private baseQuery = knex
    .from('comments')
    .innerJoin('users as user', 'user.id', 'comments.userId')
    .innerJoin('posts as post', 'post.id', 'comments.postId')
    .innerJoin('users as post_author', 'post_author.id', 'post.authorId')
    .leftJoin(
      knex
        .select('commentId')
        .count('* as likes')
        .from('comment_likes as likes_counter')
        .innerJoin(
          'users as likes_counter_user',
          'likes_counter_user.id',
          'likes_counter.userId',
        )
        .where({
          'likes_counter.deletedAt': null,
          'likes_counter_user.deletedAt': null,
        })
        .groupBy('commentId')
        .as('likes_counter'),
      'likes_counter.commentId',
      'comments.id',
    )
    .where({
      'comments.deletedAt': null,
      'user.deletedAt': null,
      'post.deletedAt': null,
      'post_author.deletedAt': null,
    });

  private baseSelectQuery = this.baseQuery
    .clone()
    .select<ICommentQuery[]>([
      'comments.id as comment_id',
      'comments.text as comment_text',
      'likes',
      'comments.createdAt as comment_createdAt',
      'comments.updatedAt as comment_updatedAt',

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

  private parseComment = (comment: ICommentQuery): Comment =>
    new Comment({
      id: comment.comment_id,
      text: comment.comment_text,
      likes: comment.likes ? parseInt(comment.likes, 10) : 0,
      createdAt: comment.comment_createdAt,
      updatedAt: comment.comment_updatedAt,
      user: {
        id: comment.user_id,
        name: comment.user_name,
        tag: comment.user_tag,
        image: comment.user_image,
        createdAt: comment.user_createdAt,
        updatedAt: comment.user_updatedAt,
      },
      post: {
        id: comment.post_id,
        text: comment.post_text,
        image: comment.post_image,
        createdAt: comment.post_createdAt,
        updatedAt: comment.post_updatedAt,
        author: {
          id: comment.post_author_id,
          name: comment.post_author_name,
          tag: comment.post_author_tag,
          image: comment.post_author_image,
          createdAt: comment.post_author_createdAt,
          updatedAt: comment.post_author_updatedAt,
        },
      },
    });

  async index(
    page: number,
    perPage: number,
  ): Promise<{
    comments: Comment[];
    count: number;
    pages: number;
  }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const comments = await this.baseSelectQuery
      .clone()
      .limit(limit)
      .offset(offset);

    const parsedComments = comments.map((comment) =>
      this.parseComment(comment),
    );

    const { count } = await this.baseCountQuery.clone();

    return {
      comments: parsedComments,
      count,
      pages: Math.ceil(count / perPage),
    };
  }

  async indexByUser(
    page: number,
    perPage: number,
    userId: string,
  ): Promise<{ comments: Comment[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const comments = await this.baseSelectQuery
      .clone()
      .where({ 'user.id': userId })
      .limit(limit)
      .offset(offset);

    const parsedComments = comments.map((comment) =>
      this.parseComment(comment),
    );

    const { count } = await this.baseCountQuery.clone().where({
      'user.id': userId,
    });

    return {
      comments: parsedComments,
      count,
      pages: Math.ceil(count / perPage),
    };
  }

  async indexByPost(
    page: number,
    perPage: number,
    postId: string,
  ): Promise<{ comments: Comment[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const comments = await this.baseSelectQuery
      .clone()
      .where({ 'post.id': postId })
      .limit(limit)
      .offset(offset);

    const parsedComments = comments.map((comment) =>
      this.parseComment(comment),
    );

    const { count } = await this.baseCountQuery.clone().where({
      'post.id': postId,
    });

    return {
      comments: parsedComments,
      count,
      pages: Math.ceil(count / perPage),
    };
  }

  async indexByPair(
    page: number,
    perPage: number,
    userId: string,
    postId: string,
  ): Promise<{ comments: Comment[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const comments = await this.baseSelectQuery
      .clone()
      .where({ 'user.id': userId, 'post.id': postId })
      .limit(limit)
      .offset(offset);

    const parsedComments = comments.map((comment) =>
      this.parseComment(comment),
    );

    const { count } = await this.baseCountQuery.clone().where({
      'user.id': userId,
      'post.id': postId,
    });

    return {
      comments: parsedComments,
      count,
      pages: Math.ceil(count / perPage),
    };
  }

  async findById(id: string): Promise<Comment | undefined> {
    const comment = await this.baseSelectQuery
      .clone()
      .where({ 'comments.id': id })
      .first();

    if (!comment) return undefined;

    return this.parseComment(comment);
  }

  async save(comment: Comment): Promise<Comment> {
    const { id: userId } = comment.user;
    const { id: postId } = comment.post;

    const [id] = await knex
      .insert({ id: comment.id, text: comment.text, userId, postId })
      .into('comments')
      .returning('id');

    const createdcomment = (await this.baseSelectQuery
      .clone()
      .where({ 'comments.id': id })
      .first()) as ICommentQuery;

    return this.parseComment(createdcomment);
  }

  async update(id: string, comment: Comment): Promise<Comment> {
    await knex('comments')
      .update({ text: comment.text, updatedAt: new Date() })
      .where({ id })
      .returning(['id', 'userId', 'postId', 'text', 'createdAt', 'updatedAt']);

    const updatedComment = (await this.baseSelectQuery
      .clone()
      .where({ 'comments.id': id })
      .first()) as ICommentQuery;

    return this.parseComment(updatedComment);
  }

  async delete(id: string): Promise<void> {
    await knex('comments').update({ deletedAt: new Date() }).where({ id });
  }
}
