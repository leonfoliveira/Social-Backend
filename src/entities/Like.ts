import { uuid } from 'uuidv4';
import User from './User';
import Post from './Post';

export default class Like {
  public readonly id!: string;

  public user!: Partial<User>;
  public post!: Partial<Post>;

  public createdAt!: Date;

  constructor(props: Partial<Like>) {
    Object.assign(this, props);

    if (!props.id) {
      this.id = uuid();
    }
  }
}
