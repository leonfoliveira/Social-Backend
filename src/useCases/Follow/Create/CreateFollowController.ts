import { Request, Response, NextFunction } from 'express';
import CreateFollowUseCase from './CreateFollowUseCase';

export default class CreateFollowController {
  constructor(private createFollowUseCase: CreateFollowUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = request.headers;
    const { targetId } = request.body;

    const { id: followerId } = JSON.parse(authorization as string);

    try {
      const follow = await this.createFollowUseCase.execute({
        followerId,
        targetId,
      });

      return response.status(201).send(follow);
    } catch (error) {
      return next(error);
    }
  }
}
