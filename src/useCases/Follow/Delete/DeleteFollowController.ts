import { Request, Response, NextFunction } from 'express';
import DeleteFollowUseCase from './DeleteFollowUseCase';

export default class DeleteFollowController {
  constructor(private deleteFollowUseCase: DeleteFollowUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = request.params;
    const { authorization } = request.headers;

    const { id: authId } = JSON.parse(authorization as string);

    try {
      await this.deleteFollowUseCase.execute({
        authId,
        id,
      });

      return response.send();
    } catch (error) {
      return next(error);
    }
  }
}
