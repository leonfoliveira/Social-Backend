import { uuid } from 'uuidv4';
import User from './User';
import Post from './Post';

export default class Comment {
  public readonly id!: string;

  public user!: Partial<User>;
  public post!: Partial<Post>;

  public text!: string;

  public createdAt!: Date;

  constructor(props: Partial<Comment>) {
    Object.assign(this, props);

    if (!props.id) {
      this.id = uuid();
    }
  }
}
