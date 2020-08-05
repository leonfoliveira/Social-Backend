import { uuid } from 'uuidv4';
import User from './User';
import Comment from './Comment';

export default class CommentLike {
  public readonly id!: string;

  public user!: Partial<User>;
  public comment!: Partial<Comment>;

  public createdAt!: Date;

  constructor(props: Partial<CommentLike>) {
    Object.assign(this, props);

    if (!props.id) {
      this.id = uuid();
    }
  }
}
