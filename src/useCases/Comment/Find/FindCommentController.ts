import { Request, Response, NextFunction } from 'express';
import FindCommentUseCase from './FindCommentUseCase';

export default class FindCommentController {
  constructor(private findCommentUseCase: FindCommentUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = request.params;

    try {
      const comment = await this.findCommentUseCase.execute({ id });

      return response.send(comment);
    } catch (error) {
      return next(error);
    }
  }
}
