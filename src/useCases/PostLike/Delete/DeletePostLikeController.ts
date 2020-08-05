import { Request, Response, NextFunction } from 'express';
import DeletePostLikeUseCase from './DeletePostLikeUseCase';

export default class DeletePostLikeController {
  constructor(private deletePostLikeUseCase: DeletePostLikeUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = request.params;
    const { authorization } = request.headers;

    const { id: authId } = JSON.parse(authorization as string);

    try {
      await this.deletePostLikeUseCase.execute({
        authId,
        id,
      });

      return response.send();
    } catch (error) {
      return next(error);
    }
  }
}
