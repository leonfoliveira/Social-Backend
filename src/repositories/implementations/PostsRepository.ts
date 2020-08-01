import IPostsRepository from '../IPostsRepository';
import Post from '../../entities/Post';
import knex from '../../database';
import User from '../../entities/User';

const PAGE_SIZE = 10;

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
  private baseIndexQuery = knex
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
        email: post.author_email,
        name: post.author_name,
        tag: post.author_tag,
        createdAt: post.author_createdAt,
        updatedAt: post.author_updatedAt,
      },
    });
  };

  async index(
    page: number,
  ): Promise<{
    posts: Post[];
    count: number;
    pages: number;
  }> {
    const limit = PAGE_SIZE;
    const offset = (page - 1) * limit;

    const posts = await this.baseIndexQuery.clone().limit(limit).offset(offset);

    const parsedPosts = posts.map((post) => this.parsePost(post));

    const { count } = await knex
      .count()
      .from('posts')
      .innerJoin('users as author', 'author.id', 'posts.authorId')
      .where({ 'posts.deletedAt': null, 'author.deletedAt': null })
      .first<{ count: number }>();

    return { posts: parsedPosts, count, pages: Math.ceil(count / PAGE_SIZE) };
  }

  async indexByAuthor(
    page: number,
    authorId: string,
  ): Promise<{ posts: Post[]; count: number; pages: number }> {
    const limit = PAGE_SIZE;
    const offset = (page - 1) * limit;

    const posts = await this.baseIndexQuery
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

    return { posts: parsedPosts, count, pages: Math.ceil(count / PAGE_SIZE) };
  }

  async findById(id: string): Promise<Post | undefined> {
    const post = await this.baseIndexQuery
      .clone()
      .where({ 'posts.id': id })
      .first();

    if (!post) {
      return undefined;
    }

    const parsedPost = this.parsePost(post);

    return parsedPost;
  }

  async save(post: Post): Promise<void> {
    const authorId = post.author.id;

    await knex.insert({ id: post.id, text: post.text, authorId }).into('posts');
  }

  async update(post: Post): Promise<Post> {
    const [updatedPost] = await knex('posts')
      .update({ text: post.text, updatedAt: new Date() })
      .where({ id: post.id })
      .returning(['id', 'authorId', 'text', 'createdAt', 'updatedAt']);

    const author = await knex('users')
      .select<User>(['id', 'email', 'name', 'tag', 'createdAt', 'updatedAt'])
      .where({ id: updatedPost.authorId });

    delete updatedPost.authorId;

    return new Post({ ...updatedPost, author });
  }
}
