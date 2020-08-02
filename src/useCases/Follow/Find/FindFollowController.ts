import { Request, Response, NextFunction } from 'express';
import FindFollowUseCase from './FindFollowUseCase';

export default class FindFollowController {
  constructor(private findFollowUseCase: FindFollowUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { followerId, targetId } = request.params;

    try {
      const follow = await this.findFollowUseCase.execute({
        followerId,
        targetId,
      });

      return response.send(follow);
    } catch (error) {
      return next(error);
    }
  }
}
