import IPostsRepository from '../IPostsRepository';
import Post from '../../entities/Post';
import User from '../../entities/User';
import knex from '../../database';

// const PAGE_SIZE = 10;

export default class PostsRepository implements IPostsRepository {
  async save(post: Post): Promise<Post> {
    const authorId = post.author.id;

    delete post.author;

    const [createdPost] = await knex
      .insert({ ...post, authorId })
      .into('posts')
      .returning<Post[]>('*');

    const author = (await knex
      .select<User>('*')
      .from('users')
      .where({ id: authorId })
      .first()) as User;

    return { ...createdPost, author };
  }
}
