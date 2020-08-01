import IPostsRepository from '../IPostsRepository';
import Post from '../../entities/Post';
import knex from '../../database';

// const PAGE_SIZE = 10;

export default class PostsRepository implements IPostsRepository {
  async save(post: Post): Promise<Post> {
    const [createdPost] = await knex
      .insert(post)
      .into('posts')
      .returning<Post[]>('*');

    return createdPost;
  }
}
