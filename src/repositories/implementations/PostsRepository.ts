import IPostsRepository from '../IPostsRepository';
import Post from '../../entities/Post';
import knex from '../../database';
import User from '../../entities/User';

interface PostQuery {
  post_id: string;
  post_text: string;
  post_createdAt: Date;
  post_updatedAt: Date;
  author_id: string;
  author_email: string;
  author_name: string;
  author_tag: string;
  author_createdAt: Date;
  author_updatedAt: Date;
}

export default class PostsRepository implements IPostsRepository {
  private baseSelectQuery = knex
    .select<PostQuery[]>([
      'posts.id as post_id',
      'posts.text as post_text',
      'posts.createdAt as post_createdAt',
      'posts.updatedAt as post_updatedAt',
      'author.id as author_id',
      'author.email as author_email',
      'author.name as author_name',
      'author.tag as author_tag',
      'author.createdAt as author_createdAt',
      'author.updatedAt as author_updatedAt',
    ])
    .from('posts')
    .innerJoin('users as author', 'author.id', 'posts.authorId')
    .where({ 'posts.deletedAt': null, 'author.deletedAt': null });

  private parsePost = (post: PostQuery) => {
    return new Post({
      id: post.post_id,
      text: post.post_text,
      createdAt: post.post_createdAt,
      updatedAt: post.post_updatedAt,
      author: {
        id: post.author_id,
        name: post.author_name,
        tag: post.author_tag,
        createdAt: post.author_createdAt,
        updatedAt: post.author_updatedAt,
      },
    });
  };

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

    const { count } = await knex
      .count()
      .from('posts')
      .innerJoin('users as author', 'author.id', 'posts.authorId')
      .where({ 'posts.deletedAt': null, 'author.deletedAt': null })
      .first<{ count: number }>();

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

    const { count } = await knex
      .count()
      .from('posts')
      .innerJoin('users as author', 'author.id', 'posts.authorId')
      .where({
        'posts.deletedAt': null,
        'author.deletedAt': null,
        'posts.authorId': authorId,
      })
      .first<{ count: number }>();

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

    const { count } = await knex
      .count()
      .from('posts')
      .innerJoin('users as author', 'author.id', 'posts.authorId')
      .where({
        'posts.deletedAt': null,
        'author.deletedAt': null,
      })
      .andWhere(function () {
        this.whereIn('posts.authorId', function () {
          this.select('targetId').from('follows').where({ followerId });
        }).orWhere('posts.authorId', followerId);
      })
      .first<{ count: number }>();

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
    const authorId = post.author.id;

    const [createdPost] = await knex
      .insert({ id: post.id, text: post.text, authorId })
      .into('posts')
      .returning(['id', 'authorId', 'text', 'createdAt', 'updatedAt']);

    const author = await knex('users')
      .select<User>(['id', 'email', 'name', 'tag', 'createdAt', 'updatedAt'])
      .where({ id: createdPost.authorId });

    return new Post({ ...createdPost, author });
  }

  async update(post: Post): Promise<Post> {
    const [updatedPost] = await knex('posts')
      .update({ text: post.text, updatedAt: new Date() })
      .where({ id: post.id })
      .returning(['id', 'authorId', 'text', 'createdAt', 'updatedAt']);

    const author = await knex
      .select<User>(['id', 'email', 'name', 'tag', 'createdAt', 'updatedAt'])
      .from('users')
      .where({ id: updatedPost.authorId });

    delete updatedPost.authorId;

    return new Post({ ...updatedPost, author });
  }

  async delete(id: string): Promise<void> {
    await knex('posts').update({ deletedAt: new Date() }).where({ id });
  }
}
