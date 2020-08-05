import { Request, Response, NextFunction } from 'express';
import UpdateCommentUseCase from './UpdateCommentUseCase';

export default class UpdateCommentController {
  constructor(private updateCommentUseCase: UpdateCommentUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = request.params;
    const { authorization } = request.headers;
    const { text } = request.body;

    const { id: authId } = JSON.parse(authorization as string);

    try {
      const comment = await this.updateCommentUseCase.execute({
        authId,
        id,
        text,
      });

      return response.send(comment);
    } catch (error) {
      return next(error);
    }
  }
}
