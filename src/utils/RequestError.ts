export default class RequestError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }

  static REPEATED_EMAIL = new RequestError(400, 'email already exists');
  static REPEATED_TAG = new RequestError(400, 'tag already exists');
  static REPEATED_FOLLOW = new RequestError(400, 'already following');
  static REPEATED_LIKE = new RequestError(400, 'already liking');

  static USER_NOT_FOUND = new RequestError(404, 'user not found');
  static POST_NOT_FOUND = new RequestError(404, 'post not found');
  static FOLLOWER_NOT_FOUND = new RequestError(404, 'follower not found');
  static TARGET_NOT_FOUND = new RequestError(404, 'target not found');
  static FOLLOW_NOT_FOUND = new RequestError(404, 'follow not found');
  static LIKE_NOT_FOUND = new RequestError(404, 'like not found');

  static INVALID_CREDENTIAL = new RequestError(
    401,
    'invalid email or incorrect password',
  );

  static INVALID_TOKEN = new RequestError(401, 'invalid token');

  static FOLLOW_ITSELF = new RequestError(400, 'cannot follow itself');

  static UPDATE_USER_NOT_OWNER = new RequestError(
    403,
    'cannot update other user',
  );

  static DELETE_USER_NOT_OWNER = new RequestError(
    403,
    'cannot delete other user',
  );

  static UPDATE_POST_NOT_OWNER = new RequestError(
    403,
    "cannot update other user's post",
  );

  static DELETE_POST_NOT_OWNER = new RequestError(
    403,
    "cannot delete other user's post",
  );

  static DELETE_FOLLOW_NOT_OWNER = new RequestError(
    403,
    "cannot delete other user's follow",
  );

  static DELETE_LIKE_NOT_OWNER = new RequestError(
    403,
    "cannot delete other user's like",
  );

  static EMPTY_UPDATE_BODY = new RequestError(400, 'empty update body');
}
