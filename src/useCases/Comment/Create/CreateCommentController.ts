import { Request, Response, NextFunction } from 'express';
import CreateCommentUseCase from './CreateCommentUseCase';

export default class CreateCommentController {
  constructor(private createCommentUseCase: CreateCommentUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = request.headers;
    const { text, postId } = request.body;

    const { id: userId } = JSON.parse(authorization as string);

    try {
      const comment = await this.createCommentUseCase.execute({
        userId,
        postId,
        text,
      });

      return response.status(201).send(comment);
    } catch (error) {
      return next(error);
    }
  }
}
