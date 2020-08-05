import { Request, Response, NextFunction } from 'express';
import DeleteCommentLikeUseCase from './DeleteCommentLikeUseCase';

export default class DeleteCommentLikeController {
  constructor(private deleteCommentLikeUseCase: DeleteCommentLikeUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = request.params;
    const { authorization } = request.headers;

    const { id: authId } = JSON.parse(authorization as string);

    try {
      await this.deleteCommentLikeUseCase.execute({
        authId,
        id,
      });

      return response.send();
    } catch (error) {
      return next(error);
    }
  }
}
