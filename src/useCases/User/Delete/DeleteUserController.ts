import { Request, Response, NextFunction } from 'express';
import DeleteUserUseCase from './DeleteUserUseCase';

export default class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = request.headers;

    const { id } = JSON.parse(authorization as string);

    try {
      await this.deleteUserUseCase.execute({
        id,
      });

      return response.send();
    } catch (error) {
      return next(error);
    }
  }
}
