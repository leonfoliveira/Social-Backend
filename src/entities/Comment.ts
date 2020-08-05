import { uuid } from 'uuidv4';
import User from './User';
import Post from './Post';

export default class Comment {
  public readonly id!: string;

  public user!: Partial<User>;
  public post!: Partial<Post>;

  public text!: string;

  public likes!: number;

  public createdAt!: Date;
  public updatedAt!: Date;

  constructor(props: Partial<Comment>) {
    Object.assign(this, props);

    if (!props.id) {
      this.id = uuid();
    }

    if (!props.likes) {
      this.likes = 0;
    }
  }
}
