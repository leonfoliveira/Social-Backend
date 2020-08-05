import { Request, Response, NextFunction } from 'express';
import DeleteCommentUseCase from './DeleteCommentUseCase';

export default class DeleteCommentController {
  constructor(private deleteCommentUseCase: DeleteCommentUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = request.params;
    const { authorization } = request.headers;

    const { id: authId } = JSON.parse(authorization as string);

    try {
      await this.deleteCommentUseCase.execute({
        authId,
        id,
      });

      return response.send();
    } catch (error) {
      return next(error);
    }
  }
}
