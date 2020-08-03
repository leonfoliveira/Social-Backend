import { Request, Response, NextFunction } from 'express';
import FeedPostUseCase from './FeedPostUseCase';

export default class FeedPostController {
  constructor(private feedPostUseCase: FeedPostUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = request.headers;
    const { page } = request.query;
    const perPage = request.query['per-page'];

    const { id: followerId } = JSON.parse(authorization as string);

    try {
      const { posts, count, pages } = await this.feedPostUseCase.execute({
        page: parseInt(page as string, 10),
        perPage: parseInt(perPage as string, 10),
        followerId,
      });

      response.header('X-Total-Count', count.toString());
      response.header('X-Total-Pages', pages.toString());

      return response.status(200).send(posts);
    } catch (error) {
      return next(error);
    }
  }
}
