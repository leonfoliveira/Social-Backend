import { Request, Response, NextFunction } from 'express';
import DeleteLikeUseCase from './DeleteLikeUseCase';

export default class DeleteLikeController {
  constructor(private deleteLikeUseCase: DeleteLikeUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = request.params;
    const { authorization } = request.headers;

    const { id: authId } = JSON.parse(authorization as string);

    try {
      await this.deleteLikeUseCase.execute({
        authId,
        id,
      });

      return response.send();
    } catch (error) {
      return next(error);
    }
  }
}
