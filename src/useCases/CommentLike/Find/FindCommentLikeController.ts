import { Request, Response, NextFunction } from 'express';
import FindCommentLikeUseCase from './FindCommentLikeUseCase';

export default class FindCommentLikeController {
  constructor(private findCommentLikeUseCase: FindCommentLikeUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { userId, commentId } = request.params;

    try {
      const commentLike = await this.findCommentLikeUseCase.execute({
        userId,
        commentId,
      });

      return response.send(commentLike);
    } catch (error) {
      return next(error);
    }
  }
}
