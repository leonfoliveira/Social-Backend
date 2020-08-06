import { uuid } from 'uuidv4';

export default class User {
  public readonly id!: string;

  public token!: string;

  public createdAt!: Date;

  constructor(props: Partial<User>) {
    Object.assign(this, props);

    if (!props.id) {
      this.id = uuid();
    }
  }
}
