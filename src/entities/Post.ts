import { uuid } from 'uuidv4';

export default class Post {
  public readonly id!: string;

  public authorId!: string;
  public text!: string;

  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;

  constructor(props: Partial<Post>) {
    Object.assign(this, props);

    if (!props.id) {
      this.id = uuid();
    }
  }
}
