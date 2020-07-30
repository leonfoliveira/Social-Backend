import { uuid } from 'uuidv4';
import bcrypt from 'bcrypt';

export default class User {
  public readonly id!: string;

  public name!: string;
  public email!: string;
  public tag!: string;
  public password!: string;
  public salt!: string;

  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;

  constructor(
    props: Omit<User, 'id' | 'salt' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: string,
  ) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }

    this.salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, this.salt);
  }
}
