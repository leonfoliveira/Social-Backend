import { Request, Response, NextFunction } from 'express';
import DeleteSessionUseCase from './DeleteSessionUseCase';

export default class DeleteSessionController {
  constructor(private deleteSessionUseCase: DeleteSessionUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { token } = request.headers;

    try {
      await this.deleteSessionUseCase.execute({
        token: token as string,
      });

      return response.send();
    } catch (error) {
      return next(error);
    }
  }
}
