import { uuid } from 'uuidv4';
import bcrypt from 'bcrypt';

export default class User {
  public readonly id!: string;

  public name!: string;
  public email!: string;
  public tag!: string;
  public description!: string;
  public password!: string;
  public salt!: string;

  public image!: string;

  public followers!: number;
  public following!: number;

  public createdAt!: Date;
  public updatedAt!: Date;

  constructor(props: Partial<User>) {
    Object.assign(this, props);

    if (!props.id) {
      this.id = uuid();
    }

    if (props.password && !props.salt) {
      this.salt = bcrypt.genSaltSync();
      this.password = bcrypt.hashSync(this.password, this.salt);
    }

    if (!props.followers) {
      this.followers = 0;
    }

    if (!props.following) {
      this.following = 0;
    }
  }
}
