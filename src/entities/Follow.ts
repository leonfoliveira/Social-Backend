import { uuid } from 'uuidv4';
import User from './User';

export default class Follow {
  public readonly id!: string;

  public follower!: Partial<User>;
  public target!: Partial<User>;

  public createdAt!: Date;

  constructor(props: Partial<Follow>) {
    Object.assign(this, props);

    if (!props.id) {
      this.id = uuid();
    }
  }
}
