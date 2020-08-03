import { Request, Response, NextFunction } from 'express';
import FindLikeUseCase from './FindLikeUseCase';

export default class FindLikeController {
  constructor(private findLikeUseCase: FindLikeUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { userId, postId } = request.params;

    try {
      const like = await this.findLikeUseCase.execute({
        userId,
        postId,
      });

      return response.send(like);
    } catch (error) {
      return next(error);
    }
  }
}
