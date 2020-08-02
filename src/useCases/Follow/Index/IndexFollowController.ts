import { Request, Response, NextFunction } from 'express';
import IndexFollowUseCase from './IndexFollowUseCase';

export default class IndexFollowController {
  constructor(private indexFollowUseCase: IndexFollowUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { page } = request.query;
    const perPage = request.query['per-page'];
    const followerId = request.query['follower-id'];
    const targetId = request.query['target-id'];

    try {
      const { follows, count, pages } = await this.indexFollowUseCase.execute({
        page: parseInt(page as string, 10),
        perPage: parseInt(perPage as string, 10),
        followerId: followerId as string | undefined,
        targetId: targetId as string | undefined,
      });

      response.header('X-Total-Count', count.toString());
      response.header('X-Total-Pages', pages.toString());

      return response.send(follows);
    } catch (error) {
      return next(error);
    }
  }
}
