import Post from '../entities/Post';

export default interface IPostsRepository {
  save(post: Post): Promise<Post>;
}
