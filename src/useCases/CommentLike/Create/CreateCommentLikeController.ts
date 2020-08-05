import { Request, Response, NextFunction } from 'express';
import CreateCommentLikeUseCase from './CreateCommentLikeUseCase';

export default class CreateCommentLikeController {
  constructor(private createCommentLikeUseCase: CreateCommentLikeUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = request.headers;
    const { commentId } = request.body;

    const { id: userId } = JSON.parse(authorization as string);

    try {
      const commentLike = await this.createCommentLikeUseCase.execute({
        userId,
        commentId,
      });

      return response.status(201).send(commentLike);
    } catch (error) {
      return next(error);
    }
  }
}
