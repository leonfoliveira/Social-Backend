import IPostsRepository from '../IPostsRepository';
import Post from '../../entities/Post';
import knex from '../../database';

interface IPostQuery {
  post_id: string;
  post_text: string;
  post_image: string;
  post_createdAt: Date;
  post_updatedAt: Date;
  likes: string;
  comments: string;
  author_id: string;
  author_email: string;
  author_name: string;
  author_tag: string;
  author_description: string;
  author_image: string;
  author_createdAt: Date;
  author_updatedAt: Date;
}

export default class PostsRepository implements IPostsRepository {
  private baseQuery = knex
    .from('posts')
    .innerJoin('users as author', 'author.id', 'posts.authorId')
    .leftJoin(
      knex
        .select('postId')
        .count('* as likes')
        .from('post_likes as likes_counter')
        .innerJoin(
          'users as likes_counter_user',
          'likes_counter_user.id',
          'likes_counter.userId',
        )
        .where({
          'likes_counter.deletedAt': null,
          'likes_counter_user.deletedAt': null,
        })
        .groupBy('postId')
        .as('likes_counter'),
      'likes_counter.postId',
      'posts.id',
    )
    .leftJoin(
      knex
        .select('postId')
        .count('* as comments')
        .from('comments as comments_counter')
        .innerJoin(
          'users as comments_counter_user',
          'comments_counter_user.id',
          'comments_counter.userId',
        )
        .where({
          'comments_counter.deletedAt': null,
          'comments_counter_user.deletedAt': null,
        })
        .groupBy('postId')
        .as('comments_counter'),
      'comments_counter.postId',
      'posts.id',
    )
    .where({ 'posts.deletedAt': null, 'author.deletedAt': null });

  private baseSelectQuery = this.baseQuery
    .clone()
    .select<IPostQuery[]>([
      'posts.id as post_id',
      'posts.text as post_text',
      'posts.image as post_image',
      'likes',
      'comments',
      'posts.createdAt as post_createdAt',
      'posts.updatedAt as post_updatedAt',

      'author.id as author_id',
      'author.email as author_email',
      'author.name as author_name',
      'author.tag as author_tag',
      'author.description as author_description',
      'author.image as author_image',
      'author.createdAt as author_createdAt',
      'author.updatedAt as author_updatedAt',
    ]);

  private baseCountQuery = this.baseQuery
    .clone()
    .count()
    .first<{ count: number }>();

  private parsePost = (post: IPostQuery): Post =>
    new Post({
      id: post.post_id,
      text: post.post_text,
      image: post.post_image,
      likes: post.likes ? parseInt(post.likes, 10) : 0,
      comments: post.comments ? parseInt(post.comments, 10) : 0,
      createdAt: post.post_createdAt,
      updatedAt: post.post_updatedAt,
      author: {
        id: post.author_id,
        name: post.author_name,
        tag: post.author_tag,
        description: post.author_description,
        image: post.author_image,
        createdAt: post.author_createdAt,
        updatedAt: post.author_updatedAt,
      },
    });

  async index(
    page: number,
    perPage: number,
  ): Promise<{
    posts: Post[];
    count: number;
    pages: number;
  }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const posts = await this.baseSelectQuery
      .clone()
      .limit(limit)
      .offset(offset);

    const parsedPosts = posts.map((post) => this.parsePost(post));

    const { count } = await this.baseCountQuery.clone();

    return { posts: parsedPosts, count, pages: Math.ceil(count / perPage) };
  }

  async indexByAuthor(
    page: number,
    perPage: number,
    authorId: string,
  ): Promise<{ posts: Post[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const posts = await this.baseSelectQuery
      .clone()
      .where({
        'posts.authorId': authorId,
      })
      .limit(limit)
      .offset(offset);

    const parsedPosts = posts.map((post) => this.parsePost(post));

    const { count } = await this.baseCountQuery
      .clone()
      .where({ 'posts.authorId': authorId });

    return { posts: parsedPosts, count, pages: Math.ceil(count / perPage) };
  }

  async indexBySlug(
    page: number,
    perPage: number,
    slug: string,
  ): Promise<{ posts: Post[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const posts = await this.baseSelectQuery
      .clone()
      .orderByRaw('likes DESC NULLS LAST, posts."createdAt" DESC')
      .where('posts.text', 'like', `%${slug}%`)
      .limit(limit)
      .offset(offset);

    const parsedPosts = posts.map((post) => this.parsePost(post));

    const { count } = await this.baseCountQuery
      .clone()
      .where('posts.text', 'like', `%${slug}%`);

    return { posts: parsedPosts, count, pages: Math.ceil(count / perPage) };
  }

  async indexByAuthorAndSlug(
    page: number,
    perPage: number,
    authorId: string,
    slug: string,
  ): Promise<{ posts: Post[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const posts = await this.baseSelectQuery
      .clone()
      .orderByRaw('likes DESC NULLS LAST, posts."createdAt" DESC')
      .where(function () {
        this.where({
          'posts.authorId': authorId,
        }).andWhere('posts.text', 'like', `%${slug}%`);
      })
      .limit(limit)
      .offset(offset);

    const parsedPosts = posts.map((post) => this.parsePost(post));

    const { count } = await this.baseCountQuery
      .clone()
      .where(function () {
        this.where({
          'posts.authorId': authorId,
        }).andWhere('posts.text', 'like', `%${slug}%`);
      })
      .where('posts.text', 'like', `%${slug}%`);

    return { posts: parsedPosts, count, pages: Math.ceil(count / perPage) };
  }

  async feed(
    page: number,
    perPage: number,
    followerId: string,
  ): Promise<{ posts: Post[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const posts = await this.baseSelectQuery
      .clone()
      .andWhere(function () {
        this.whereIn('posts.authorId', function () {
          this.select('targetId').from('follows').where({ followerId });
        }).orWhere('posts.authorId', followerId);
      })
      .orderBy('posts.createdAt', 'desc')
      .limit(limit)
      .offset(offset);

    const parsedPosts = posts.map((post) => this.parsePost(post));

    const { count } = await this.baseCountQuery.clone().andWhere(function () {
      this.whereIn('posts.authorId', function () {
        this.select('targetId').from('follows').where({ followerId });
      }).orWhere('posts.authorId', followerId);
    });

    return { posts: parsedPosts, count, pages: Math.ceil(count / perPage) };
  }

  async trend(
    page: number,
    perPage: number,
    time: number,
  ): Promise<{ posts: Post[]; count: number; pages: number }> {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const posts = await this.baseSelectQuery
      .clone()
      .leftJoin(
        knex
          .select('postId')
          .count('* as last_likes')
          .from('post_likes as last_likes_counter')
          .innerJoin(
            'users as last_likes_counter_user',
            'last_likes_counter_user.id',
            'last_likes_counter.userId',
          )
          .where({
            'last_likes_counter.deletedAt': null,
            'last_likes_counter_user.deletedAt': null,
          })
          .andWhere(
            'last_likes_counter.createdAt',
            '>',
            new Date(Date.now() - time),
          )
          .groupBy('postId')
          .as('last_likes_counter'),
        'last_likes_counter.postId',
        'posts.id',
      )
      .orderByRaw('last_likes DESC NULLS LAST, posts."createdAt" DESC')
      .limit(limit)
      .offset(offset);

    const parsedPosts = posts.map((post) => this.parsePost(post));

    const { count } = await this.baseCountQuery.clone();

    return { posts: parsedPosts, count, pages: Math.ceil(count / perPage) };
  }

  async findById(id: string): Promise<Post | undefined> {
    const post = await this.baseSelectQuery
      .clone()
      .where({ 'posts.id': id })
      .first();

    if (!post) {
      return undefined;
    }

    const parsedPost = this.parsePost(post);

    return parsedPost;
  }

  async save(post: Post): Promise<Post> {
    delete post.likes;

    const [id] = await knex
      .insert({
        id: post.id,
        text: post.text,
        authorId: post.author.id,
        image: post.image,
      })
      .into('posts')
      .returning('id');

    const createdPost = (await this.baseSelectQuery
      .clone()
      .where({ 'posts.id': id })
      .first()) as IPostQuery;

    return this.parsePost(createdPost);
  }

  async update(id: string, post: Post): Promise<Post> {
    delete post.likes;

    await knex('posts')
      .update({ text: post.text, updatedAt: new Date() })
      .where({ id })
      .returning(['id', 'authorId', 'text', 'createdAt', 'updatedAt']);

    const updatedPost = (await this.baseSelectQuery
      .clone()
      .where({ 'posts.id': id })
      .first()) as IPostQuery;

    return this.parsePost(updatedPost);
  }

  async delete(id: string): Promise<void> {
    await knex('posts').update({ deletedAt: new Date() }).where({ id });
  }
}
