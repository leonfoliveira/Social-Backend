export default class RequestError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }

  static REPEATED_EMAIL = new RequestError(400, 'email already exists');
  static REPEATED_TAG = new RequestError(400, 'tag already exists');

  static USER_NOT_FOUND = new RequestError(404, 'user not found');

  static INVALID_CREDENTIAL = new RequestError(
    401,
    'invalid email or incorrect password',
  );

  static INVALID_TOKEN = new RequestError(401, 'invalid token');

  static UPDATE_NOT_USER = new RequestError(403, 'cannot update other user');

  static EMPTY_UPDATE_BODY = new RequestError(400, 'empty update body');
}
