import { Request, Response, NextFunction } from 'express';
import DeletePostUseCase from './DeletePostUseCase';

export default class DeletePostController {
  constructor(private deletePostUseCase: DeletePostUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = request.params;
    const { authorization } = request.headers;

    const { id: authId } = JSON.parse(authorization as string);

    try {
      await this.deletePostUseCase.execute({
        authId,
        id,
      });

      return response.send();
    } catch (error) {
      return next(error);
    }
  }
}
