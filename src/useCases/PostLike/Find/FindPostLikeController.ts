import { Request, Response, NextFunction } from 'express';
import FindPostLikeUseCase from './FindPostLikeUseCase';

export default class FindPostLikeController {
  constructor(private findPostLikeUseCase: FindPostLikeUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { userId, postId } = request.params;

    try {
      const postlike = await this.findPostLikeUseCase.execute({
        userId,
        postId,
      });

      return response.send(postlike);
    } catch (error) {
      return next(error);
    }
  }
}
