import { uuid } from 'uuidv4';
import User from './User';

export default class Post {
  public readonly id!: string;

  public author!: Partial<User>;
  public text!: string;

  public image!: string;

  public likes!: number;
  public comments!: number;

  public createdAt!: Date;
  public updatedAt!: Date;

  constructor(props: Partial<Post>) {
    Object.assign(this, props);

    if (!props.id) {
      this.id = uuid();
    }

    if (!props.likes) {
      this.likes = 0;
    }

    if (!props.comments) {
      this.comments = 0;
    }
  }
}
