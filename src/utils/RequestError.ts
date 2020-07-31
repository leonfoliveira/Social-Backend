export default class RequestError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }

  static REPEATED_EMAIL = new RequestError(400, 'email already exists');
  static REPEATED_TAG = new RequestError(400, 'tag already exists');

  static USER_NOT_FOUND = new RequestError(404, 'user not found');
}
